var positions = ['Member', 'Executive/Lead', 'Advisor'];

var ContactListItemOptions = React.createClass({displayName: "ContactListItemOptions",
  render: function() {
    return (
      React.createElement("ul", null, 
        React.createElement("li", null, React.createElement("a", {href: "#"}, "Modify")), 
        React.createElement("li", null, React.createElement("a", {href: "#"}, "Remove"))
      )
    );
  }
});

var ContactListItem = React.createClass({displayName: "ContactListItem",
  render: function() {
    return (
      React.createElement("tr", null, 
        React.createElement("td", null, this.props.data.name), 
        React.createElement("td", null, this.props.data.email), 
        React.createElement("td", null, this.props.data.phone), 
        React.createElement("td", null, positions[this.props.data.position]), 
        React.createElement("td", null, React.createElement(ContactListItemOptions, null))
      )
    );
  }
});

var ContactList = React.createClass({displayName: "ContactList",
  render: function() {
    var contactNodes = this.props.contacts.map(function (contact, i) {console.log(i);
      return (
        React.createElement(ContactListItem, {key: i, data: contact})
      );
    });

    return (
      React.createElement("tbody", null, 
        contactNodes
      )
    );
  }
});

var ContactListBody = React.createClass({displayName: "ContactListBody",
  getInitialState: function() {
    return {data: []}
  },
  loadContacts: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(contacts) {
        this.setState({
          data: contacts
        })
      }.bind(this)
    });
  },
  componentDidMount: function() {
    this.loadContacts();
    setInterval(this.loadContacts, this.props.pollInterval);
  },
  render: function() {
    return (
      React.createElement(ContactList, {contacts: this.state.data})
    );
  }
});

React.render(
  React.createElement(ContactListBody, {url: "data.json", pollInterval: 2000}),
  document.getElementById('data-table')
);
