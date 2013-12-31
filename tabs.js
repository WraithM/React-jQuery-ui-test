/** @jsx React.DOM */

var AddTab = React.createClass({
    addTabSubmit: function() {
        var name = this.refs.tabname.getDOMNode().value.trim();
        var body = this.refs.tabbody.getDOMNode().value.trim();

        this.props.addTab(name, body);

        this.refs.tabbody.getDOMNode().value = '';
        this.refs.tabname.getDOMNode().value = '';
        return false;
    },
    render: function() {
        return (
            <form className="addTab" onSubmit={this.addTabSubmit} >
                <input type="text" placeholder="Tab name" ref="tabname" />
                <input type="text" placeholder="Tab body" ref="tabbody" />
                <input type="submit" value="Add tab..." />
            </form>
        );
    }
});

var Draggable = React.createClass({
    componentDidMount: function() {
        var dragId = "#" + this.props.id;
        $(function() { 
            $(dragId).draggable();
            var dragStyle = $(dragId).css({ 
                width: "100px", 
                height: "25px", 
                padding: "0.5em"
            });
        });
    },
    render: function() {
        return (
            <div id={this.props.id} class="ui-widget-content" className="draggable">
                <p>{this.props.body}</p>
            </div>
        );
    }
});

var Tabs = React.createClass({
    componentDidMount: function() {
        $(function() { $("#tabs").tabs(); });
    },
    componentDidUpdate: function() {
        $(function() { $("#tabs").tabs("refresh"); });
    },
    render: function() {
        var numTabs = 0;
        var tabTitles = this.props.data.map(
            function (data) {
                numTabs = numTabs + 1;
                return <li><a href={"#tab" + numTabs}>{data.name}</a></li>;
            }
        );
        numTabs = 0;
        var tabBodies = this.props.data.map(
            function (data) {
                numTabs = numTabs + 1;
                return <div id={"tab" + numTabs}><Draggable id={"draggable" + numTabs} body={data.body}/></div>;
            }
        );

        return (
            <div id="tabs" className="tabs">
                <ul>
                    {tabTitles}
                </ul>
                {tabBodies}
            </div>
        );
    }
});

var TabBox = React.createClass({
    getInitialState: function() {
        return {data: []};
    },
    addTab: function(name, body) {
        var oldTabs = this.state.data;
        var newTabs = oldTabs.concat([{name: name, body: body}]);
        this.setState({data: newTabs});
    },
    render: function() {
        return (
            <div className="tabBox">
                <Tabs data={this.state.data}/>
                <AddTab addTab={this.addTab}/>
            </div>
        );
    }
});

React.renderComponent(
    <TabBox/>,
    document.getElementById('example')
);
