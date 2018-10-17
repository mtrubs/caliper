/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const rewire = require('rewire');
const sawtooth = rewire('../../src/sawtooth/sawtooth');

const chai = require('chai');
chai.should();
const assert = chai.assert;
const sinon = require('sinon');

describe('sawtooth implementation', () => {
    describe('#getUrl', () => {
        const getUrl = sawtooth.__get__('getUrl');

        it('error if it does not get an array or a string', () => {
            try {
                getUrl(1);
                assert.fail(null, null, 'Exception expected');
            } catch (err) {
                if (err.constructor.name === 'AssertionError') {
                    throw err;
                }
                err.message.should.equal('Unable to get a url from the provided configuration');
            }
        });

        it('should be able to handle a string', () => {
            getUrl('some.url').should.equal('some.url');
        });

        it('should be able to handle an array of size 1', () => {
            getUrl(['some.url']).should.equal('some.url');
        });

        it('should be able to handle an array and select one at random', () => {
            sinon.stub(Math, 'random').returns(0.74);
            getUrl(['some.url', 'other.url', 'my.url', 'your.url']).should.equal('my.url');
        });
    });

});