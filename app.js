$(function() {

  var shoppingList = {
    // STATE ////////////////////////////////////////////
    state: {
      items: []
    },

    // STATE MODIFIERS ///////////////////////////////////
    addItem: function(state, itemName) {
      state.items.push({
        name: itemName,
        checked: false
      });
    },

    updateCheckStatus: function(state, clickedItemId) {
      state.items.forEach(function(item, index) {
        if (index === clickedItemId) {
          item.checked = item.checked ? false : true;
        }
      });
    },

    removeItem: function(state, clickedItemId) {
      state.items.forEach(function(item, index) {
        if (index === clickedItemId) {
          state.items.splice(index, 1);
        }
      });
    },

    // STATE RENDER ////////////////////////////////////////////////
    renderItems: function(state, element) {
      var items = state.items.map(function(item, index) {
        var checkedClass = item.checked ? ' shopping-item__checked' : '';
        return (
          '<li class="js-list-item" data-item-id="' + index + '">\
            <span class="shopping-item' + checkedClass + '">' + item.name + '</span>\
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

  // EVENT LISTENERS ////////////////////////////////////////////////////////////
  // handle adding item
  $('.js-shopping-list-form').submit(function(event) {
    event.preventDefault();
    shoppingList.addItem(
      shoppingList.state,
      $('.js-shopping-list-entry').val()
    );
    shoppingList.renderItems(shoppingList.state, $('.js-shopping-list'));
    this.reset();
  });

  // handle clicking check
  $('.shopping-list').on('click', '.js-button-check', function(event) {
    var clickedItemId = $(this).closest('.js-list-item').data('item-id');

    shoppingList.updateCheckStatus(shoppingList.state, clickedItemId);
    shoppingList.renderItems(shoppingList.state, $('.js-shopping-list'));
  });

  // handle clicking delete
  $('.shopping-list').on('click', '.js-button-delete', function(event) {
    var clickedItemId = $(this).closest('.js-list-item').data('item-id');

    shoppingList.removeItem(shoppingList.state, clickedItemId);
    shoppingList.renderItems(shoppingList.state, $('.js-shopping-list'));
  });

});
