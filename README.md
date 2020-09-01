
# hook-for-react-use-fetch ⚛

![alt react](https://img.shields.io/badge/react-v16.13.x-brightgreen)
![alt react](https://img.shields.io/badge/size-x-red)
![alt react](https://img.shields.io/badge/stage-just.started-red)

THIS PACKAGE IS NOT AVAILABLE YET

Fetching data always follows the same patern. Fetching status is set to "pending", it displays a loading icon, it saves data to the state and sets the status to "success". useFetch is a simple lightweight react hook to handle data fetching. It comes with the bare fetch function or with another hook useAxios.

![alt exaltation](https://static.adzaria.co/usefetch.png)


# What's great about it ⭐

* Just declare useFetch like you would declare useState, 
* Do not repeat the pattern again and again


# Get started 🚀

## Install it 
```
npm i hook-for-react-use-fetch // NOT AVAILABLE YET
```

## Call it
```
const useFetch = require('hook-for-react-use-fetch');

or

import {useFetch} from "hook-for-react-use-fetch";

```

## Declare an initial state for the fetched data and choose a method

It can be empty

```
const initialState = {
};
```

## Declare useFetch like you would declare useState or any other hook
```
    const [fetchedData, fetch] = useFetch(initialState, method);
```

## And finally just call it in a useEffect

Use another useEffect to do something once data is fetched

```
```

status is stored in fetched._status, do not overwrite this value ...

# Doc 🔖

    
# useFetch Won't do

* Make you latte ☕️
* Make your grades better (but exalt-grade will so check it)