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

  it('should not match', () => {
    const replacer = jest.fn()
    const testStr = `import * as png from '../../../assets/images/logo.ts'`
    testStr.replace(re, replacer)
    expect(replacer.mock.calls.length).toEqual(0)
  })
})
