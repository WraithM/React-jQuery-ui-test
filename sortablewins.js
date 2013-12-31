/** @jsx React.DOM */

/* TODO Test content, remove */
var testContent = 
    <p>
    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aliquam magna sem, fringilla in, commodo a, rutrum ut, massa. Donec id nibh eu dui auctor tempor. Morbi laoreet eleifend dolor. Suspendisse pede odio, accumsan vitae, auctor non, suscipit at, ipsum. Cras varius sapien vel lectus.
    </p>

var Window = React.createClass({
    render: function() {
        return (
            <div>
                <div className="widget-head"><h3>{this.props.title}</h3></div>
                <div className="widget-content">{this.props.children}</div>
            </div>
        );
    }
});

var Column = React.createClass({
    render: function() {
        var drawMembers = this.props.children.map(function(member) {
            return <li className="widget color-green">{member}</li>;
        });

        return <ul className="column" id={this.props.id}>{drawMembers}</ul>;
    }
});

var Columns = React.createClass({
    componentDidMount: function() {
        var sortId = ".column";
        $(function() { 
            $(sortId).sortable();
            $(sortId).disableSelection();
        });
    },
    render: function() {
        return (
            <div id="columns">
                <Column id="column1">
                    <Window title="This is a Title">{testContent}</Window>
                    <Window title="Title"><p>test data</p></Window>
                </Column>
                <Column id="column3">
                    <Window title="This ifdjslaks a Title"><p>two paragraphs</p><p>Another paragraph</p></Window>
                    <Window title="Tifds atle"><p>test dfdjsailjlds aata</p></Window>
                </Column>
            </div>
        );
    }
});

React.renderComponent(
    <Columns/>,
    document.getElementById('example')
);
