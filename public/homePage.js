// LogOut

const logOut = new LogoutButton();
logOut.action = () => {
    ApiConnector.logout(callback => {
        if (callback.success === true) {
            location.reload()
        }
    })
}

// Profile

ApiConnector.current(callback => {  console.log(callback);
    if (callback.success === true) {
        ProfileWidget.showProfile(callback.data) 
    }
})

// RatesBoard

const ratesBoard = new RatesBoard()
function updateStocks() {
    ApiConnector.getStocks(callback => { console.log(callback);
        if(callback.success === true) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(callback.data)
        }
    })
}

updateStocks();
setInterval(updateStocks, 60000)

// MoneyManager

const Money = new MoneyManager();
Money.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, callback => { 
        console.log(callback);
        if (callback.success === true) {
            ProfileWidget.showProfile(callback.data)
            Money.setMessage(true, "Кошелек пополнен")
        } else {
            Money.setMessage(false, callback.error)
        }
    })
}

Money.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, callback => {
        console.log(callback);
        if (callback.success === true) {
            ProfileWidget.showProfile(callback.data)
            Money.setMessage(true, "Конвертация прошла успешно")
        } else {
            Money.setMessage(false, callback.error)
        }
    })
}

Money.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, callback => {
        if (callback.success === true) {
            ProfileWidget.showProfile(callback.data)
            Money.setMessage(true, "Деньги успешно отправлены")
        } else {
            Money.setMessage(false, callback.error)
        }
    })
}

// FavoritesWidget

const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites(callback => {
    if (callback.success) {
        favoritesWidget.clearTable()
        favoritesWidget.fillTable(callback.data)
        Money.updateUsersList(callback.data)
    }
})

favoritesWidget.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites(data, callback => {
        if (callback.success) {
            favoritesWidget.clearTable()
            favoritesWidget.fillTable(callback.data)
            Money.updateUsersList(callback.data)
            favoritesWidget.setMessage(true, "Пользователь успешно добавлен")
        } else {
            favoritesWidget.setMessage(false, callback.error)
        }
    })
}

favoritesWidget.removeUserCallback = (id) => {
    ApiConnector.removeUserFromFavorites(id, callback => {
        if (callback.success) {
            favoritesWidget.clearTable()
            favoritesWidget.fillTable(callback.data)
            Money.updateUsersList(callback.data)
            favoritesWidget.setMessage(true, "Пользователь успешно удален")
        } else {
            favoritesWidget.setMessage(false, callback.error)
        }
    })
}
