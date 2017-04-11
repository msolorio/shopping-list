$(function() {

  var shoppingList = {
    // state object
    state: {
      items: [],
      idCount: 0
    },

    // functions that modify state

    // adds an item object to the items array
    addItem: function(state, itemName) {
      var itemObj = {
        name: itemName,
        checked: null,
        itemId: state.idCount
      };
      state.items.push(itemObj);
      state.idCount++;
    },

    updateCheckStatus: function(state, buttonClicked) {
      console.log(buttonClicked.parents('.js-list-item').data('item-id'));
    },

    renderItems: function(state, element) {
      var items = state.items.map(function(item) {
        return (
          '<li class="js-list-item" data-item-id="' + item.itemId + '">\
            <span class="shopping-item ' + item.checked + '">' + item.name + '</span>\
            <div class="shopping-item-controls">\
              <button class="shopping-item-toggle js-button-check">\
                <span class="button-label">check</span>\
              </button>\
              <button class="shopping-item-delete js-button-delete">\
                <span class="button-label">delete</span>\
              </button>\
            </div>\
          </li>'
        );
      });
      element.html(items);
    }
  };

  // handle adding item
  $('.js-shopping-list-form').submit(function(event) {
    event.preventDefault();
    shoppingList.addItem(
      shoppingList.state,
      $('.js-shopping-list-entry').val()
    );
    shoppingList.renderItems(shoppingList.state, $('.js-shopping-list'));
  });

  // handle clicking check
  $('.shopping-list').on('click', '.js-button-check', function(event) {
    console.log('checked button clicked');
    shoppingList.updateCheckStatus(shoppingList.state, $(this));
  });

  // handle clicking delete
  $('.shopping-list').on('click', '.js-button-delete', function(event) {
    console.log('delete button clicked');
  });

});
