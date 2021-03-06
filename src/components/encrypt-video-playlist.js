var React = require(`react`);
var Thumb = require(`./encrypt-video-thumbnail.js`);

module.exports = React.createClass({
  //TODO: call Thumb for each video in object, passing object as props
  //Also pass index so that clicking can pass active video back up the chain
  getDefaultProps() {
    return {
      activeVideo: 0
    };
  },
  render: function() {
    var thumbs = [];
    for (var i = 0; i < this.props.videos.length; i++){
      thumbs.push(<Thumb key={i} index={i} activeVideo={this.props.activeVideo} makeActive={this.props.changeVideo} pageType={this.props.pageType} videoDidStart={this.props.videoDidStart}  video={this.props.videos[i]} />);
    }
    var playlistTitle = (<div></div>);
    if (this.props.playlistTitle) {
      playlistTitle = (
        <h2>{this.props.playlistTitle}</h2>
      );
    }
    return (
      <div className="playlist-wrapper">
        {playlistTitle}
        <div className="playlist">
          {thumbs}
        </div>
      </div>
    );
  }
});
