module.exports = resultHandle = (data = {}, status = 0, msg = "success") => {
  return {
    data,
    status,
    msg
  }
}