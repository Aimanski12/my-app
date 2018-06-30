const expect = require('expect')

let { generateMessage } = require('./message');


describe('generateMessage', (req, res) => {
  it('should generate correct message object', ()=>{  
    let from = 'sample';
    let text = 'sample';
    // let createdAt = new Date().getTime()
    let message = generateMessage(from, text);
    // console.log(message)

    expect(typeof message.createdAt).toBe('number');
    expect(message).toMatchObject({from, text});
    // // expect(obj.text).toBe('this is your text');

    // done();

  })


  // it('should', () => {


  // })


})