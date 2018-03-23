import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ProgressBar, { Circle } from 'react-progressbar.js'
let int;

class Blog extends Component {


  autoclick() {
    let isEnabled = true;
    if (this.props.clicker_1.amount == 0) {
      isEnabled = false;
    }
    this.props.bc1action();
    if (isEnabled === false) {
      int = setInterval(() => {
        this.props.attackAction();
      }, 1000);
      isEnabled = true;
    }
  }

  buy_2_clicker() {
    this.props.bc2action();
  }

  load() {
    
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => {
          this.props.loadaction();
          resolve("result");
        }, 100);
    });

    promise
      .then(
        result => {
          if (this.props.clicker_1.amount > 0) {
            clearInterval(int);
            int = setInterval(() => {
              this.props.attackAction();
            }, 1000);
          }
        },
      );
  }

  render() {
    const { health } = this.props
    const { gold } = this.props
    const { level } = this.props
    const { kills } = this.props
    const { attackAction } = this.props
    const { bc1action } = this.props
    const { clicker_1 } = this.props
    const { clicker_2 } = this.props
    const { saveaction } = this.props
    const { loadaction } = this.props
    let maxhealth = health / (10 + (kills - 1)*100)
    let hprogress = this.props.kills / 50
    let options = {
      color: '#aaa',
      strokeWidth: 5,
    }
    let optionsH = {
      color: '#222',
      strokeWidth: 5, 
      duration: 200,
    }

    return <div className="mdl-grid demo-content game">
              <div className="demo-graphs mdl-shadow--2dp mdl-color--white mdl-cell mdl-cell--12-col">
                 <BlogWrap health={health} 
                 level={level}
                 kills={kills}
                 gold={gold} 
                 clicker_1={clicker_1}
                 clicker_2={clicker_2} />
              </div>
              <div className="demo-graphs mdl-shadow--2dp mdl-color--white mdl-cell mdl-cell--3-col progress-graph">
                <Circle
                  progress={hprogress}
                  text={'Уровень ' + level}
                  options={options}
                  initialAnimate={false} />
              </div>
              <div className="demo-graphs mdl-shadow--2dp mdl-color--white mdl-cell mdl-cell--3-col progress-graph">
                <Circle
                  progress={maxhealth}
                  text={'Здоровье монстра'}
                  options={optionsH}
                  initialAnimate={false} />
              </div>
              <div className="demo-graphs mdl-shadow--2dp mdl-color--white mdl-cell mdl-cell--4-col">
                 <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" 
                 onClick={attackAction}>Атаковать</button>
                 <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" 
                 onClick={this.autoclick.bind(this)}>Купить автокликер за {clicker_1.curr_cost + clicker_1.start_cost}</button>
                 <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" 
                 onClick={this.buy_2_clicker.bind(this)}>Купить автокликер за {clicker_2.curr_cost + clicker_2.start_cost}</button>
              </div>
              <div className="demo-graphs mdl-shadow--2dp mdl-color--white mdl-cell mdl-cell--3-col">
                  <button onClick={saveaction}
                  className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored">Сохранить</button>
                   <button onClick={this.load.bind(this)}
                  className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored">Загрузить</button>
              </div>
          </div>
  }
}

class BlogWrap extends Component {


  render() {
    const { health } = this.props
    const { gold } = this.props
    const { kills } = this.props
    const { level } = this.props
    const { clicker_1 } = this.props
    const { clicker_2 } = this.props
    return <div className="blog-wrap">
              <p>Золото: <b>{gold}</b></p>
              <p>Убито монстров: <b>{kills - 1}</b></p>
              <p>Уровень: <b>{level}</b></p>
              <p>Здоровье монстра: <b>{health}</b></p>
              <p>Сила атаки: <b>{1 + clicker_1.atk_dmg*clicker_1.amount + clicker_2.atk_dmg*clicker_2.amount}</b></p>
           </div>
  }

}



export default Blog
