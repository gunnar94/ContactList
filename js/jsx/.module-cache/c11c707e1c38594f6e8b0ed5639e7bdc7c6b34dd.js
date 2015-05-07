var ContactListItem = React.createClass({displayName: "ContactListItem",
  render: function() {
    return (
      React.createElement("tr", null, 
        React.createElement("td", null, this.props.info.name), 
        React.createElement("td", null), 
        React.createElement("td", null), 
        React.createElement("td", null), 
        React.createElement("td", null)
      )
    );
  }
});

var ContactList = React.createClass({displayName: "ContactList",
  render: function() {console.log(this);
    var contactNodes = this.state.data.map(function (contact) {
      return (
        React.createElement(ContactListItem, {info: contact})
      );
    });

    return (
      {contactNodes}
    );
  }
});

var ContactListBody = React.createClass({displayName: "ContactListBody",
  getInitialState: function() {
    return {data: []}
  },
  render: function() {
    return (
      React.createElement("tbody", null, 
        React.createElement(ContactList, {contacts: this.state.data})
      )
    );
  }
});

React.render(
  React.createElement(ContactListBody, {url: "data.json"}),
  document.getElementById('data-table')
);