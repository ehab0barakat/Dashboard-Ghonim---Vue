export const formatDate = (dateString) => {
  if (!dateString) return null;

  const d = new Date(dateString);

  return (
    d.getFullYear() +
    "-" +
    ("0" + (d.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + d.getDate()).slice(-2)
  );
};

export const formatDateTime = (dateString) => {
  const d = new Date(dateString);

  return (
    d.getFullYear() +
    "/" +
    ("0" + (d.getMonth() + 1)).slice(-2) +
    "/" +
    ("0" + d.getDate()).slice(-2) +
    "-" + ("0" + d.getHours()).slice(-2) +
    ":" + ("0" + d.getMinutes()).slice(-2)
  );
};

export const formatTime = (dateString) => {
  const d = new Date(dateString);

  return (
    d.getHours().slice(-2) +
    ":" + ("0" + d.getMinutes()).slice(-2) +
    ":" + ("0" + d.getSeconds()).slice(-2)
  );
};


export const formatSendDateTime = (dateString) => {
  const d = new Date(dateString);

  return (
    d.getFullYear() +
    "-" +
    ("0" + (d.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + d.getDate()).slice(-2) +
    "T" + ("0" + d.getHours()).slice(-2) +
    ":" + ("0" + d.getMinutes()).slice(-2) +
    ":" + ("0" + d.getSeconds()).slice(-2)
  );
};

export const formatSendDate = (dateString) => {
  const d = new Date(dateString);

  return (
    d.getFullYear() +
    "-" +
    ("0" + (d.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + d.getDate()).slice(-2)
  );
};


export const errorMessage = (e) => {
  const errors = [];
  if (e.response && e.response.data && e.response.data.data) {
    for (const [key, value] of Object.entries(e.response.data.data))
      errors.push(value.join(", "));
  }
  const message = errors.join(" ")
  // return this.showSnackbar(
  //   true,
  //   errors.length > 0 ? errors.join(" ") : this.t("messages.unexpectedError")
  // );
  if (errors.length > 0) {
    return message
  } else {
    return false
  }
};

export const openUrl = (url) => {
  if(url) window.open(url, '_blank');
}
