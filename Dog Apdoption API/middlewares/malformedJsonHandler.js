function malformedJsonHandler(err, req, res, next) {
  if (err instanceof SyntaxError && "body" in err) {
    return res.status(400).json({ error: "Malformed JSON" });
  }
  next();
}

module.exports = malformedJsonHandler;
