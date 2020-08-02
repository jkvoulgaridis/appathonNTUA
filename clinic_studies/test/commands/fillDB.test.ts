import {expect, test} from '@oclif/test'

describe('fillDB', () => {
  test
  .stdout()
  .command(['fillDB'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['fillDB', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
