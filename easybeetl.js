const core = {
  appendPlaceHolder(temp) {
    return '${' + temp + '}'
  },
  appendIf(temp, str) {
    return temp + '(' + str + '?'
  },
  appendTrue(temp, str) {
    return temp + str + ':'
  },
  appendFalse(temp, str) {
    return temp + str + ')'
  },
  appendSingle(temp, str) {
    return temp + str
  },
  appendString(temp, str) {
    return temp + '+' + str
  },
  appendParam(temp, str) {
    return temp + ',' + str
  },
  appendBracket(temp, str) {
    return temp + '(' + str + ')'
  },
  appendPoint(temp, str) {
    return temp + '.' + str
  },
  appendAdd(temp, str) {
    return temp + '+' + str
  },
  appendSub(temp, str) {
    return temp + '-' + str
  },
  appendMulti(temp, str) {
    return temp + '*' + str
  },
  appendDiv(temp, str) {
    return temp + '/' + str
  },
  appendDate(temp, str) {
    return temp + 'date()'
  },
  appendDateOn(temp, str) {
    return temp + 'date(' + str + ')'
  },
  appendPrint(temp, str) {
    return temp + 'print(' + str + ')'
  },
  appendPrintln(temp, str) {
    return temp + 'println(' + str + ')'
  },
  appendPrintFile(temp, str) {
    return temp + 'printFile(' + str + ')'
  },
  appendNvl(temp, str) {
    return temp + 'nvl(' + str + ')'
  },
  appendIsEmpty(temp, str) {
    return temp + 'isEmpty(' + str + ')'
  },
  appendIsNotEmpty(temp, str) {
    return temp + 'isNotEmpty(' + str + ')'
  },
  appendTrim(temp, str) {
    return temp + 'trim(' + str + ')'
  },
  appendTrunc(temp, str) {
    return temp + 'trunc(' + str + ')'
  },
  appendParseInt(temp, str) {
    return temp + 'parseInt(' + str + ')'
  },
  appendParseLong(temp, str) {
    return temp + 'parseLong(' + str + ')'
  },
  appendParseDouble(temp, str) {
    return temp + 'parseDouble(' + str + ')'
  },
  appendRange(temp, str) {
    return temp + 'range(' + str + ')'
  },
  appendJson(temp, str) {
    return temp + 'json(' + str + ')'
  },
  appendCookie(temp, str) {
    return temp + 'cookie(' + str + ')'
  },
  appendStrStartWith(temp, str) {
    return temp + 'strutil.startWith(' + str + ')'
  },
  appendStrEndWith(temp, str) {
    return temp + 'strutil.endWith(' + str + ')'
  },
  appendStrLength(temp, str) {
    return temp + 'strutil.length(' + str + ')'
  },
  appendStrSubString(temp, str) {
    return temp + 'strutil.subString(' + str + ')'
  },
  appendStrSubStringTo(temp, str) {
    return temp + 'strutil.subStringTo(' + str + ')'
  },
  appendStrSplit(temp, str) {
    return temp + 'strutil.split(' + str + ')'
  },
  appendStrContain(temp, str) {
    return temp + 'strutil.contain(' + str + ')'
  },
  appendStrToUpperCase(temp, str) {
    return temp + 'strutil.toUpperCase(' + str + ')'
  },
  appendStrToLowerCase(temp, str) {
    return temp + 'strutil.toLowerCase(' + str + ')'
  },
  appendStrReplace(temp, str) {
    return temp + 'strutil.replace(' + str + ')'
  },
  appendStrFormat(temp, str) {
    return temp + 'strutil.format(' + str + ')'
  },
  appendStrTrim(temp, str) {
    return temp + 'strutil.trim(' + str + ')'
  },
  appendStrFormatDate(temp, str) {
    return temp + 'strutil.formatDate(' + str + ')'
  },
  appendStrIndex(temp, str) {
    return temp + 'strutil.index(' + str + ')'
  },
  appendStrLastIndex(temp, str) {
    return temp + 'strutil.lastIndex(' + str + ')'
  },
  appendArrayRange(temp, str) {
    return temp + 'array.range(' + str + ')'
  },
  appendArrayRemove(temp, str) {
    return temp + 'array.remove(' + str + ')'
  },
  appendArrayAdd(temp, str) {
    return temp + 'array.add(' + str + ')'
  },
  appendArrayContain(temp, str) {
    return temp + 'array.contain(' + str + ')'
  },
  appendArrayToArray(temp, str) {
    return temp + 'array.toArray(' + str + ')'
  },
  appendArrayCollection2Array(temp, str) {
    return temp + 'array.collection2Array(' + str + ')'
  },
  appendRegMatch(temp, str) {
    return temp + 'reg.match(' + str + ')'
  },
  appendRegReplace(temp, str) {
    return temp + 'reg.replace(' + str + ')'
  },
  appendRegFind(temp, str) {
    return temp + 'reg.find(' + str + ')'
  },
  appendRegFindList(temp, str) {
    return temp + 'reg.findList(' + str + ')'
  },
  appendRegSplit(temp, str) {
    return temp + 'reg.split(' + str + ')'
  },
  appendRegSplitLimit(temp, str) {
    return temp + 'reg.split(' + str + ')'
  },
  exec(ex, temp) {
    if (ex.type === 'placeholder') {
      for (let period of ex.value) {
        temp = this.exec(period, temp)
      }
      return this.appendPlaceHolder(temp)
    }
    if (this[ex.method] === undefined) {
      this[ex.method] = (temp, str) => {
        return temp + ex.method + '(' + str + ')'
      }
    }
    if (ex.type === 'string_double') {
      return this[ex.method](temp, '"' + ex.value + '"')
    }
    if (ex.type === 'string_single') {
      return this[ex.method](temp, "'" + ex.value + "'")
    }
    if (ex.type === 'variable') {
      return this[ex.method](temp, ex.value)
    }
    if (ex.type === 'expression') {
      let str = ''
      for (let period of ex.value) {
        str = this.exec(period, str)
      }
      temp = this[ex.method](temp, str)
      return temp
    }
  }
}

export const easybeetl = {
  build() {
    return {
      type: "placeholder",
      value: []
    }
  },
  render: (stack) => {
    return core.exec(stack, '');
  },
  add: (stack, pos, obj) => {
    let targetList = stack
    let n = pos.length
    for (let i = 0; i < n - 1; i++) {
      targetList = targetList.value[pos[i]]
    }
    let index = pos[n - 1]
    targetList.value.splice(index, 0, obj)
  },
  remove: (stack, pos) => {
    let idx = pos[pos.length - 1]
    pos.splice(pos.length - 1, 1)
    for (let i of pos) {
      stack = stack.value[i]
    }
    stack.value.splice(idx, 1)
  },
  set: (stack, pos, options) => {
    for (let i of pos) {
      stack = stack.value[i]
    }
    stack.value = options.value
    stack.type = options.type
    stack.method = options.method
  }
}