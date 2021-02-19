import { exp } from "react-native-reanimated";
import { Emoji } from "../config/interface";

interface Children {
  [key: string]: Node
}

interface NodeOptionsType {
  parent?: Node | undefined
  word?: boolean
  depth?: number
}

class Node {
  // 节点值
  public key: string
  // 是否为单词最后节点
  public word: boolean
  // 父节点的引用
  public parent: Node | undefined
  // 子节点的引用（goto表）
  public children: Children = {}
  // failure表，用于匹配失败后的跳转
  public failure: Node | undefined = undefined
  // 字符深度
  public depth: number = 0

  constructor (
    key: string,
    options: NodeOptionsType = {}
  ) {
    const { parent, word, depth } = options

    this.key = key
    this.parent = parent
    this.word = word || false
    this.depth = typeof depth === 'number' ? depth : 1
  }
}

class Tree {
  public root: Node

  constructor() {
    this.root = new Node('root', {
      depth: 0
    })
  }

  /**
   * 插入数据
   * @param key
   */
  insert(key: string): boolean {
    if (!key) return false
    let keyArr = key.split('').reverse()
    let firstKey: any = keyArr.pop()
    let children = this.root.children
    const len = keyArr.length
    let firstNode = children[firstKey]

    // 第一个key
    if (!firstNode) {
      children[firstKey] = len
        ? new Node(firstKey)
        : new Node(firstKey, {
          word: true
        })
    } else if (!len) {
      firstNode.word = true
    }

    // 其他多余的key
    if (len >= 1) {
      this.insertNode(children[firstKey], keyArr, len + 1)
    }

    return true
  }

  /**
   * 插入节点
   * @param node
   * @param word
   */
  insertNode(node: Node, word: string[], starLen: number) {
    let len = word.length

    if (len) {
      let children: Children
      children = node.children

      const key: any = word.pop()
      let item = children[key]
      const isWord = len === 1

      if (!item) {
        item = new Node(key, {
          parent: node,
          word: isWord,
          depth: starLen - len + 1
        })
      } else if (!item.word) {
        item.word = isWord
      }

      children[key] = item
      this.insertNode(item, word, starLen)
    }
  }

  /**
   * 创建Failure表
   */
  createFailureTable() {
    // 获取树第一层
    let currQueue: Array<Node> = Object.values(this.root.children)
    while (currQueue.length > 0) {
      let nextQueue: Array<Node> = []
      for (let i = 0; i < currQueue.length; i++) {
        let node: Node = currQueue[i]
        let key = node.key
        let parent = node.parent
        node.failure = this.root
        // 获取树下一层
        for (let k in node.children) {
          nextQueue.push(node.children[k])
        }

        if (parent) {
          let failure: any = parent.failure
          while (failure) {
            let children: any = failure.children[key]

            // 判断是否到了根节点
            if (children) {
              node.failure = children
              break
            }
            failure = failure.failure
          }
        }
      }

      currQueue = nextQueue
    }
  }

  /**
   * 搜索节点
   * @param key
   * @param node
   */
  search(key: string, node: Children = this.root.children): Node | undefined {
    return node[key]
  }
}

interface FilterValue {
  text: string,
  pass: boolean
}

interface EmojiType {
  word: string,
  toWord: string,
}

class Mint extends Tree {

  public keyTable: Array<EmojiType>

  constructor(keywords: Array<EmojiType> = []) {
    super()
    this.keyTable = keywords;
    // 创建Trie树
    for (let item of keywords) {
      this.insert(item.word);
    }

    this.createFailureTable()
  }

  /**
   * 筛选方法
   * @param word 文字
   * @param every 验证全部
   * @param replace 是否替换
   */
  private filterFunc(text: string): FilterValue {
    // 字符长度
    const wordLen = text.length
    if (wordLen <= 0) {
      return {
        text: text || "",
        pass: true
      }
    }

    // 过滤后的文字
    let filterText = ''

    // 当前树位置
    let currNode: Node | undefined = this.root
    let nextNode: Node | undefined

    // 失配路线
    let failure

    // 是否通过验证
    let isPass = true

    for (let endIndex = 0; endIndex < wordLen; endIndex++) {
      const key = text[endIndex]
      filterText += key
      nextNode = this.search(key, currNode.children)
      if (!nextNode) {
        failure = currNode.failure
        while (failure) {
          nextNode = this.search(key, failure.children)
          if (nextNode) break
          failure = failure.failure
        }
      }

      if (nextNode) {
        failure = nextNode
        do {
          if (failure?.word) {
            isPass = false
            const len = failure.depth

            let keyword = filterText.slice(-len);
            let replaceWord = '';
            
            for (let item of this.keyTable) {
              if(item.word === keyword) {
                replaceWord = item.toWord;
                break;
              }
            }
        
            filterText = filterText.slice(0, -len) + replaceWord;

          }
          failure = failure?.failure
        } while (failure?.key !== 'root');

        currNode = nextNode
        continue;
      }
      currNode = this.root
    }

    return {
      text: filterText,
      pass: isPass
    }
  }

  /**
   * 过滤方法
   * @param text 文本
   * @param options 选项
   */
  filterSync(text: string): FilterValue {
    return this.filterFunc(text)
  }
}

/**
 * 将正文中的emoji替换为<img>
 * @param text 正文
 * @param emojis emojis数组
 */
export const replaceContentEmoji = (text: string, emojis: Emoji[]): string => {
  if(!text || text.length == 0 || !emojis) {
    return "";
  }

  if(text.indexOf(":") == -1) {
    return text;
  } 

  const ACList: Array<EmojiType> = [];

  // 将正文中的emoji字段替换为<img>标签
  for (let item of emojis) {
    ACList.push({
      word: `:${item.shortcode}:`,
      toWord: `<img src=${item.url} width=16 height=16 style="vertical-align:middle;" />`
    })
  }

  const m = new Mint(ACList);
  
  const replaced: FilterValue = m.filterSync(text);

  return replaced.text;
}

/**
 * 将文本中的emoji替换为以类型分类的数组，可以按顺序渲染不同的内容
 * @param text 正文
 * @param emojis emojis数组
 */

export const replaceNameEmoji = (text: string, emojis: Emoji[]): any[] => {
  if(!text || text.length == 0 || !emojis) {
    return [];
  }

  if(text.indexOf(":") == -1) {
    return [{
      text: text,
      image: false,
    }];
  } 

  const ACList: Array<EmojiType> = [];
  const mark = "|";

  for (let item of emojis) {
    ACList.push({
      word: `:${item.shortcode}:`,
      toWord: mark + item.url,
    })
  }

  const m = new Mint(ACList);
  
  const replaced: FilterValue = m.filterSync(text);
  const result = replaced.text.split(mark);
  const re = [];

  for(let item of result) {
    let isEmoji = false;
    for (let emoji of emojis) {
      if(emoji.url === item) {
        isEmoji = true;
      }
    }
    re.push({
      text: item,
      image: isEmoji,
    });
  }
  return re;
}
