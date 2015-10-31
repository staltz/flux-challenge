import React, {Component} from 'react';
import webApi from '../utils/web-api';
import JediActions from '../actions/JediActions'

export default class JediScroll extends Component {

  render() {
    const props = this.props;
    const _scrollUp = () => {
      JediActions.seekMasters();
      webApi.getJedi(props.first.master.url, 'Master');
    };
    const _scrollDown = () => {
      JediActions.seekApprentices();
      webApi.getJedi(props.last.apprentice.url, 'Apprentice');
    };
    if(!props.scrollable) {
      return (
        <div className="css-scroll-buttons">
          <button className="css-button-up css-button-disabled" />
          <button className="css-button-down css-button-disabled" />
        </div>
      );
    }
    else {
      if (!props.canUp && !props.canDown) {
        return (
          <div className="css-scroll-buttons">
            <button className="css-button-up css-button-disabled" />
            <button className="css-button-down css-button-disabled" />
          </div>
        );
      }
      else {
        if (props.canDown && !props.canUp) {
          return (
            <div className="css-scroll-buttons">
              <button className="css-button-up css-button-disabled" />
              <button className="css-button-down" onClick={_scrollDown}/>
            </div>
          );
        }
        else {
          if (!props.canDown && props.canUp) {
            return (
              <div className="css-scroll-buttons">
              <button className="css-button-up " onClick={_scrollUp}/>
              <button className="css-button-down css-button-disabled" />
              </div>
            );
          }
        }
      }
       return (
         <div className="css-scroll-buttons">
           <button className="css-button-up " onClick={_scrollUp}/>
           <button className="css-button-down" onClick={_scrollDown}/>
         </div>
       );
    }
  }

};
