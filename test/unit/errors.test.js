'use strict'
/* eslint-disable no-unused-expressions */
const {expect} = require('chai')

const errorHandler = require('../../server/routes/errors')

const req = {url: 'foo.com/bar'}
const res = {
  renderResults: {},
  status: () => res,
  render: (template, opts) => { res.renderResults = {template, opts} }
}

describe('Error Handler', () => {
  it('should export middleware', () => {
    expect(errorHandler).to.be.a('function')
  })

  it('should handle a 404 correctly', () => {
    const err = {message: 'Not found'}
    errorHandler(err, req, res, () => {})
    const {template, opts} = res.renderResults
    expect(template).equals('errors/404')
    expect(opts.err).equals(err)
    expect(opts.template).to.be.a('function')
  })

  it('should handle a 403 correctly', () => {
    const err = {message: 'Unauthorized'}
    errorHandler(err, req, res, () => {})
    const {template, opts} = res.renderResults
    expect(template).equals('errors/403')
    expect(opts.err).equals(err)
    expect(opts.template).to.be.a('function')
  })

  it('should default to 500', () => {
    errorHandler({}, req, res, () => {})
    const {template, opts} = res.renderResults
    expect(template).equals('errors/500')
    expect(opts.err).to.be.empty
    expect(opts.template).to.be.a('function')
  })
})
