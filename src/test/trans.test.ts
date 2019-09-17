import { OpTrans, model } from "../js/model/serializable";
import { Logger } from "../js/util/logger";
import { guid, Assert } from "../js/util/util";
import { Position } from "../js/model/painter";

describe("test_encode", () => {
  it("encode", () => {
    const op = model.Operation.create();
    op.uuid = guid();
    op.isDraw = true;
    op.startPos = new Position(1, 1);

    const enData = model.Operation.encode(op).finish();
    Logger.info(enData);

    const deData = model.Operation.decode(enData);
    Assert(deData.isDraw === op.isDraw);
    Assert(deData.uuid === op.uuid);
  });
});
