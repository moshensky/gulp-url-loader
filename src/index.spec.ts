import { re } from './'
describe('regex', () => {
  it('should match png', () => {
    const replacer = jest.fn()
    const testStr = `import * as globalTestLogo from '../../../assets/images/logo.png'`
    testStr.replace(re, replacer)
    expect(replacer.mock.calls.length).toEqual(1)
    expect(replacer.mock.calls[0]).toEqual([
      "import * as globalTestLogo from '../../../assets/images/logo.png'",
      'globalTestLogo',
      "'",
      '../../../assets/images/logo.png',
      0,
      "import * as globalTestLogo from '../../../assets/images/logo.png'",
    ])
  })

  it('should match jpg', () => {
    const replacer = jest.fn()
    const testStr = `import * as globalTestLogo from '../../../assets/images/logo.jpg'`
    testStr.replace(re, replacer)
    expect(replacer.mock.calls.length).toEqual(1)
    expect(replacer.mock.calls[0]).toEqual([
      "import * as globalTestLogo from '../../../assets/images/logo.jpg'",
      'globalTestLogo',
      "'",
      '../../../assets/images/logo.jpg',
      0,
      "import * as globalTestLogo from '../../../assets/images/logo.jpg'",
    ])
  })

  it('should match gif with regular import', () => {
    const replacer = jest.fn()
    const testStr = "import globalTestLogo from  '../../../assets/images/logo.gif'"
    testStr.replace(re, replacer)
    expect(replacer.mock.calls.length).toEqual(1)
    expect(replacer.mock.calls[0]).toEqual([
      "import globalTestLogo from  '../../../assets/images/logo.gif'",
      'globalTestLogo',
      "'",
      '../../../assets/images/logo.gif',
      0,
      "import globalTestLogo from  '../../../assets/images/logo.gif'",
    ])
  })

  it('should not match', () => {
    const replacer = jest.fn()
    const testStr = `import * as png from '../../../assets/images/logo.ts'`
    testStr.replace(re, replacer)
    expect(replacer.mock.calls.length).toEqual(0)
  })
})
