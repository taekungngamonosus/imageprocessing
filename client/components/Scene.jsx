import React, { Component } from 'react';
import { cyan600, blue500, fullWhite } from 'material-ui/styles/colors';

import RaisedButton from 'material-ui/RaisedButton';
import Slider from 'material-ui/Slider';

const imageId = 'image';
const canvasId = 'scene';
// const imageURL = 'https://s-media-cache-ak0.pinimg.com/736x/83/33/ce/8333cea18ba251dc22d82f9aa07559a1--cityscape-photography-london-photography.jpg';
const imageURL = 'london.jpg';

const style = {
  height: 480,
  width: 320,
  marginLeft: 20,
  textAlign: 'center',
  display: 'inline-block',
  overflow: 'hidden',
  backgroundColor: cyan600,
};

const imageBoxStyle = {
  width: 320,
  display: 'inline-block',
};

export default class Scene extends Component {
  constructor(props) {
    super(props);

    this.state = {
      brightness: 0,
      red: 0,
      blue: 0,
      green: 0,
    };

    this.draw = this.draw.bind(this);
    this.filterGrayScale = this.filterGrayScale.bind(this);
    this.handleChaneBrightness = this.handleChaneBrightness.bind(this);
    // this.filterBrightness = this.filterBrightness.bind(this);
  }

  componentDidMount() {
    this.draw();
  }

  draw() {
    let canvas = document.getElementById("scene");
    let ctx = canvas.getContext('2d');

    let img = new Image();
    img.onload = function () {
      canvas.width = 320;
      canvas.height = 480;
      ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, 320, 480);
    }
    img.src = imageURL;
  }

  handleChaneBrightness(event, value) {
    this.setState({brightness: Math.round(value)});
    this.filterBrightness(this.state.brightness);
  }

  filterColor(red, blue, green) {
    let canvas = document.getElementById("scene");
    let ctx = canvas.getContext('2d');

    let img = new Image();
    img.onload = function () {
      var imgWidth = img.width || img.naturalWidth;
      var imgHeight = img.height || img.naturalHeight;

      canvas.width = 320;
      canvas.height = 480;

      ctx.drawImage(img, 0, 0, imgWidth, imgHeight, 0, 0, 320, 480);
      localStorage.setItem("savedImageData", canvas.toDataURL("image/jpeg"));
      img.style.display = 'none';

      let imageData = ctx.getImageData(0, 0, imgWidth, imgHeight);
      let data = imageData.data

      for (var i = 0; i < data.length; i += 4) {
        data[i]     = red + data[i];
        data[i + 1] = blue + data[i + 1];
        data[i + 2] = green + data[i + 2];
      }
      ctx.putImageData(imageData, 0, 0);
    }
    img.src = imageURL;
  }

  filterBrightness(pixs) {
    let canvas = document.getElementById("scene");
    let ctx = canvas.getContext('2d');

    let img = new Image();
    img.onload = function () {
      var imgWidth = img.width || img.naturalWidth;
      var imgHeight = img.height || img.naturalHeight;

      canvas.width = 320;
      canvas.height = 480;

      ctx.drawImage(img, 0, 0, imgWidth, imgHeight, 0, 0, 320, 480);
      localStorage.setItem("savedImageData", canvas.toDataURL("image/jpeg"));
      img.style.display = 'none';

      let imageData = ctx.getImageData(0, 0, imgWidth, imgHeight);
      let data = imageData.data

      for (var i = 0; i < data.length; i += 4) {
        data[i]     = pixs + data[i];
        data[i + 1] = pixs + data[i + 1];
        data[i + 2] = pixs + data[i + 2];
      }
      ctx.putImageData(imageData, 0, 0);
    }
    img.src = imageURL;
  }

  filterGrayScale() {
    var img = new Image();
    var canvas = document.getElementById("scene");
    var ctx = canvas.getContext('2d');

    // fixed cross origin access bug
    img.crossOrigin = "Anonymous";

    img.onload = function () {
      let imgWidth = img.width || img.naturalWidth;
      let imgHeight = img.height || img.naturalHeight;

      canvas.width = 320;
      canvas.height = 480;

      ctx.drawImage(img, 0, 0, imgWidth, imgHeight, 0, 0, 320, 480);
      localStorage.setItem("savedImageData", canvas.toDataURL("image/jpeg"));
      img.style.display = 'none';

      let imageData = ctx.getImageData(0, 0, imgWidth, imgHeight);
      let data = imageData.data;

      for (let j = 0; j < imgHeight; j++) {
        for (let i = 0; i < imgWidth; i++) {
          let k = (j * 4) * imgWidth + i * 4;
          let avg = (data[k] + data[k + 1] + data[k + 2]) / 3;
          // console.log(avg);
          data[k] = avg;
          data[k + 1] = avg;
          data[k + 2] = avg;
        }
      }
      ctx.putImageData(imageData, 0, 0);
    }
    img.src = imageURL;
  }

  render () {
    return (
      <div>
        <div style={{ float: 'left', display: 'inline-block', marginTop: '30px', marginBottom: '20px', marginRight: '20px' }}>
          <div id={ imageId } style= { imageBoxStyle }>
            <img src={ imageURL } style={{ width: '100%', display: 'block' }} />
          </div>
          <canvas id={ canvasId } style={ style }>
            <span>Image Here</span>
          </canvas>
        </div>

        <div style={{ float: 'left', display: 'inline-block' }}>
          <div style={{ position: 'relative' }}>
            <p style={{ fontFamily: 'Roboto, Arial', display: 'block', lineHeight: '1.8em' }}>{ 'Brightness :' }</p>

            <Slider style={{ display: 'inline-block', minWidth: '300px', width: 500, marginRight: 15, marginLeft: 15 }} min={-100} max={100} value={this.state.brightness} onChange={this.handleChaneBrightness} />
            <div style={{ fontFamily: 'Roboto, Arial', display: 'inline-block', lineHeight: '1.8em', position: 'absolute', top: 62 }}>{ this.state.brightness }</div>
          </div>

          <RaisedButton onTouchTap={ this.draw } style={{ marginRight: 15 }} label="Render image on canvas" />
          <RaisedButton onTouchTap={ this.filterGrayScale } style={{ marginRight: 15 }} label="Add Grayscale to Image" primary={ true } />
        </div>

      </div>
    )
  }

}
