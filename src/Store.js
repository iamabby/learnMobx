import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { observable, computed, useStrict, action } from 'mobx';
import { observer } from 'mobx-react';
useStrict(true)
 
class VM {
  @observable firstName = '';
  @observable lastName = '';
 
  @computed get fullName() {
    const { firstName, lastName } = this;
    if (!firstName && !lastName) {
      return 'Please input your name!'
    } else {
      return firstName + ' ' + lastName;
    }
  };
 
  @action.bound
  setValue(key, event) {
    this[key] = event.target.value;
  }
  @action.bound
  doReset() {
    this.firstName = '';
    this.lastName = '';
  }
}
 
@observer
class Store extends Component {
  render() {
    const vm = this.props.vm;
    return (
      <div>
        <h1>This is mobx-react!</h1>
        <p>First name: <input type="text" value={vm.firstName} onChange={e => vm.setValue('firstName', e)} /></p>
        <p>Last name: <input type="text" value={vm.lastName} onChange={e => vm.setValue('lastName', e)} /></p>
        <p>Full name: {vm.fullName}</p>
        <p><button onClick={vm.doReset}>Reset</button></p>
      </div>
    );
  }
}
 
export default Store;