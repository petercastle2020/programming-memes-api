const express = require("express");

const requestCounts = {};

const rateLimiter = (req, res, next) => {
  const { ip } = req;

  requestCounts[ip] = (requestCounts[ip] || 0) + 1;

  req.requestCount = requestCounts[ip];

  if (requestCounts[ip] > 50) {
    return res.status(429).json({ error: "Too many requests." });
  }

  setTimeout(() => {
    delete requestCounts[ip];
  }, 60000);

  next();
};

module.exports = rateLimiter;
