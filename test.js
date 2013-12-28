/** @jsx React.DOM */

// Markdown converter
var converter = new Showdown.converter();

// Comment class
var Comment = React.createClass({
    render: function() {
        var rawMarkup = 
                converter.makeHtml(this.props.children.toString());
        return (
            <div className="comment">
                {this.props.author} : 
                <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
            </div>
        );
    }
});

var CommentList = React.createClass({
    render: function() {
        var commentNodes = this.props.data.map(
            function (comment) {
                return <Comment author={comment.author}>{comment.text}</Comment>;
            }
        );

        return (
            <div className="commentList">
                {commentNodes}
            </div>
        );
    }
});

var CommentForm = React.createClass({
    handleSubmit: function() {
        var author = this.refs.author.getDOMNode().value.trim();
        var text = this.refs.text.getDOMNode().value.trim();

        this.props.onCommentSubmit({author: author, text: text});

        this.refs.author.getDOMNode().value = '';
        this.refs.text.getDOMNode().value = '';
        return false;
    },
    render: function() {
        return (
            <form className="commentForm" onSubmit={this.handleSubmit} >
                <input type="text" placeholder="Your name" ref="author" />
                <input type="text" placeholder="Say something..." ref="text" />
                <input type="submit" value="Submit comment..." />
            </form>
        );
    }
});

var CommentBox = React.createClass({
    loadComments: function() {
        $.ajax({
            url: this.props.url,
            success: function(data) {
                this.setState({data: data});
            }.bind(this)
        });
    },
    handleSubmit: function(comment) {
        var comments = this.state.data;
        var newComments = comments.concat([comment]);
        this.setState({data: newComments});

        // TODO write function server-side to handle comments.
        $.ajax({
            url: this.props.url,
            type: 'POST',
            data: comment,
            success: function(data) {
                this.setState({data: data});
            }.bind(this)
        });
    },
    getInitialState: function() {
        return {data: []};
    },
    componentWillMount: function() {
        this.loadComments();
        setInterval(this.loadComments, this.props.pollInterval);
    },
    render: function() {
        return (
            <div className="commentBox">
                <h1>Some comments</h1>
                <CommentList data = {this.state.data}/>
                <CommentForm onCommentSubmit={this.handleSubmit} />
            </div>
        );
    }
});

React.renderComponent(
    <CommentBox url="comments.json" pollInterval={2000} />,
    document.getElementById('example')
);
