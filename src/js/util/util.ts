function Assert(b: boolean) {
  if (!b) {
    throw new Error("Assert Error");
  }
}

async function delay(interval: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, interval);
  });
}

// generate uuid
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4();
}

function isMochaRunning(): boolean {
  // console.log(process.env);
  return typeof global.it === "function";
}

export { Assert, guid, isMochaRunning, delay };
