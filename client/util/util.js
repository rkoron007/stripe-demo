const handleResponseJSON = response => {
  if (response.status >= 201) {
    throw new Error("Bad response from server");
  }
  return response.json();
};

const fetchRequest = url => {
  return fetch(`${url}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "same-origin"
  });
};

export const fetchItems = () => {
  return fetchRequest("/api/items")
    .then(response => handleResponseJSON(response))
    .then(data => {
      return data;
    });
};

const postRequest = (url, body) => {
  return fetch(`${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "same-origin",
    body: `${body}`
  });
};

export const createPaymentIntent = (paymentMethod, price) => {
  return postRequest(
    "/api/pay",
    JSON.stringify({
      paymentMethodId: paymentMethod.id,
      price: price
    })
  );
};
