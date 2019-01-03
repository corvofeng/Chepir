/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
(function(global, factory) { /* global define, require, module */

    /* AMD */ if (typeof define === 'function' && define.amd)
        define(["protobufjs/minimal"], factory);

    /* CommonJS */ else if (typeof require === 'function' && typeof module === 'object' && module && module.exports)
        module.exports = factory(require("protobufjs/minimal"));

})(this, function($protobuf) {
    "use strict";

    // Common aliases
    var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;
    
    // Exported root namespace
    var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});
    
    $root.cheipr = (function() {
    
        /**
         * Namespace cheipr.
         * @exports cheipr
         * @namespace
         */
        var cheipr = {};
    
        cheipr.Operation = (function() {
    
            /**
             * Properties of an Operation.
             * @memberof cheipr
             * @interface IOperation
             * @property {cheipr.Operation.IPosition|null} [startPos] Operation startPos
             * @property {number|Long|null} [startTime] Operation startTime
             * @property {boolean|null} [isDraw] Operation isDraw
             * @property {Array.<cheipr.Operation.ITrack>|null} [tracks] Operation tracks
             * @property {string|null} [uuid] Operation uuid
             */
    
            /**
             * Constructs a new Operation.
             * @memberof cheipr
             * @classdesc Represents an Operation.
             * @implements IOperation
             * @constructor
             * @param {cheipr.IOperation=} [properties] Properties to set
             */
            function Operation(properties) {
                this.tracks = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * Operation startPos.
             * @member {cheipr.Operation.IPosition|null|undefined} startPos
             * @memberof cheipr.Operation
             * @instance
             */
            Operation.prototype.startPos = null;
    
            /**
             * Operation startTime.
             * @member {number|Long} startTime
             * @memberof cheipr.Operation
             * @instance
             */
            Operation.prototype.startTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
            /**
             * Operation isDraw.
             * @member {boolean} isDraw
             * @memberof cheipr.Operation
             * @instance
             */
            Operation.prototype.isDraw = false;
    
            /**
             * Operation tracks.
             * @member {Array.<cheipr.Operation.ITrack>} tracks
             * @memberof cheipr.Operation
             * @instance
             */
            Operation.prototype.tracks = $util.emptyArray;
    
            /**
             * Operation uuid.
             * @member {string} uuid
             * @memberof cheipr.Operation
             * @instance
             */
            Operation.prototype.uuid = "";
    
            /**
             * Creates a new Operation instance using the specified properties.
             * @function create
             * @memberof cheipr.Operation
             * @static
             * @param {cheipr.IOperation=} [properties] Properties to set
             * @returns {cheipr.Operation} Operation instance
             */
            Operation.create = function create(properties) {
                return new Operation(properties);
            };
    
            /**
             * Encodes the specified Operation message. Does not implicitly {@link cheipr.Operation.verify|verify} messages.
             * @function encode
             * @memberof cheipr.Operation
             * @static
             * @param {cheipr.IOperation} message Operation message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Operation.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.startPos != null && message.hasOwnProperty("startPos"))
                    $root.cheipr.Operation.Position.encode(message.startPos, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.startTime != null && message.hasOwnProperty("startTime"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int64(message.startTime);
                if (message.isDraw != null && message.hasOwnProperty("isDraw"))
                    writer.uint32(/* id 3, wireType 0 =*/24).bool(message.isDraw);
                if (message.tracks != null && message.tracks.length)
                    for (var i = 0; i < message.tracks.length; ++i)
                        $root.cheipr.Operation.Track.encode(message.tracks[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                if (message.uuid != null && message.hasOwnProperty("uuid"))
                    writer.uint32(/* id 5, wireType 2 =*/42).string(message.uuid);
                return writer;
            };
    
            /**
             * Encodes the specified Operation message, length delimited. Does not implicitly {@link cheipr.Operation.verify|verify} messages.
             * @function encodeDelimited
             * @memberof cheipr.Operation
             * @static
             * @param {cheipr.IOperation} message Operation message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Operation.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes an Operation message from the specified reader or buffer.
             * @function decode
             * @memberof cheipr.Operation
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {cheipr.Operation} Operation
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Operation.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.cheipr.Operation();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.startPos = $root.cheipr.Operation.Position.decode(reader, reader.uint32());
                        break;
                    case 2:
                        message.startTime = reader.int64();
                        break;
                    case 3:
                        message.isDraw = reader.bool();
                        break;
                    case 4:
                        if (!(message.tracks && message.tracks.length))
                            message.tracks = [];
                        message.tracks.push($root.cheipr.Operation.Track.decode(reader, reader.uint32()));
                        break;
                    case 5:
                        message.uuid = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes an Operation message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof cheipr.Operation
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {cheipr.Operation} Operation
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Operation.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies an Operation message.
             * @function verify
             * @memberof cheipr.Operation
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Operation.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.startPos != null && message.hasOwnProperty("startPos")) {
                    var error = $root.cheipr.Operation.Position.verify(message.startPos);
                    if (error)
                        return "startPos." + error;
                }
                if (message.startTime != null && message.hasOwnProperty("startTime"))
                    if (!$util.isInteger(message.startTime) && !(message.startTime && $util.isInteger(message.startTime.low) && $util.isInteger(message.startTime.high)))
                        return "startTime: integer|Long expected";
                if (message.isDraw != null && message.hasOwnProperty("isDraw"))
                    if (typeof message.isDraw !== "boolean")
                        return "isDraw: boolean expected";
                if (message.tracks != null && message.hasOwnProperty("tracks")) {
                    if (!Array.isArray(message.tracks))
                        return "tracks: array expected";
                    for (var i = 0; i < message.tracks.length; ++i) {
                        var error = $root.cheipr.Operation.Track.verify(message.tracks[i]);
                        if (error)
                            return "tracks." + error;
                    }
                }
                if (message.uuid != null && message.hasOwnProperty("uuid"))
                    if (!$util.isString(message.uuid))
                        return "uuid: string expected";
                return null;
            };
    
            /**
             * Creates an Operation message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof cheipr.Operation
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {cheipr.Operation} Operation
             */
            Operation.fromObject = function fromObject(object) {
                if (object instanceof $root.cheipr.Operation)
                    return object;
                var message = new $root.cheipr.Operation();
                if (object.startPos != null) {
                    if (typeof object.startPos !== "object")
                        throw TypeError(".cheipr.Operation.startPos: object expected");
                    message.startPos = $root.cheipr.Operation.Position.fromObject(object.startPos);
                }
                if (object.startTime != null)
                    if ($util.Long)
                        (message.startTime = $util.Long.fromValue(object.startTime)).unsigned = false;
                    else if (typeof object.startTime === "string")
                        message.startTime = parseInt(object.startTime, 10);
                    else if (typeof object.startTime === "number")
                        message.startTime = object.startTime;
                    else if (typeof object.startTime === "object")
                        message.startTime = new $util.LongBits(object.startTime.low >>> 0, object.startTime.high >>> 0).toNumber();
                if (object.isDraw != null)
                    message.isDraw = Boolean(object.isDraw);
                if (object.tracks) {
                    if (!Array.isArray(object.tracks))
                        throw TypeError(".cheipr.Operation.tracks: array expected");
                    message.tracks = [];
                    for (var i = 0; i < object.tracks.length; ++i) {
                        if (typeof object.tracks[i] !== "object")
                            throw TypeError(".cheipr.Operation.tracks: object expected");
                        message.tracks[i] = $root.cheipr.Operation.Track.fromObject(object.tracks[i]);
                    }
                }
                if (object.uuid != null)
                    message.uuid = String(object.uuid);
                return message;
            };
    
            /**
             * Creates a plain object from an Operation message. Also converts values to other types if specified.
             * @function toObject
             * @memberof cheipr.Operation
             * @static
             * @param {cheipr.Operation} message Operation
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Operation.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.tracks = [];
                if (options.defaults) {
                    object.startPos = null;
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.startTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.startTime = options.longs === String ? "0" : 0;
                    object.isDraw = false;
                    object.uuid = "";
                }
                if (message.startPos != null && message.hasOwnProperty("startPos"))
                    object.startPos = $root.cheipr.Operation.Position.toObject(message.startPos, options);
                if (message.startTime != null && message.hasOwnProperty("startTime"))
                    if (typeof message.startTime === "number")
                        object.startTime = options.longs === String ? String(message.startTime) : message.startTime;
                    else
                        object.startTime = options.longs === String ? $util.Long.prototype.toString.call(message.startTime) : options.longs === Number ? new $util.LongBits(message.startTime.low >>> 0, message.startTime.high >>> 0).toNumber() : message.startTime;
                if (message.isDraw != null && message.hasOwnProperty("isDraw"))
                    object.isDraw = message.isDraw;
                if (message.tracks && message.tracks.length) {
                    object.tracks = [];
                    for (var j = 0; j < message.tracks.length; ++j)
                        object.tracks[j] = $root.cheipr.Operation.Track.toObject(message.tracks[j], options);
                }
                if (message.uuid != null && message.hasOwnProperty("uuid"))
                    object.uuid = message.uuid;
                return object;
            };
    
            /**
             * Converts this Operation to JSON.
             * @function toJSON
             * @memberof cheipr.Operation
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Operation.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            Operation.Position = (function() {
    
                /**
                 * Properties of a Position.
                 * @memberof cheipr.Operation
                 * @interface IPosition
                 * @property {number|Long|null} [x] Position x
                 * @property {number|Long|null} [y] Position y
                 */
    
                /**
                 * Constructs a new Position.
                 * @memberof cheipr.Operation
                 * @classdesc Represents a Position.
                 * @implements IPosition
                 * @constructor
                 * @param {cheipr.Operation.IPosition=} [properties] Properties to set
                 */
                function Position(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }
    
                /**
                 * Position x.
                 * @member {number|Long} x
                 * @memberof cheipr.Operation.Position
                 * @instance
                 */
                Position.prototype.x = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
                /**
                 * Position y.
                 * @member {number|Long} y
                 * @memberof cheipr.Operation.Position
                 * @instance
                 */
                Position.prototype.y = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
                /**
                 * Creates a new Position instance using the specified properties.
                 * @function create
                 * @memberof cheipr.Operation.Position
                 * @static
                 * @param {cheipr.Operation.IPosition=} [properties] Properties to set
                 * @returns {cheipr.Operation.Position} Position instance
                 */
                Position.create = function create(properties) {
                    return new Position(properties);
                };
    
                /**
                 * Encodes the specified Position message. Does not implicitly {@link cheipr.Operation.Position.verify|verify} messages.
                 * @function encode
                 * @memberof cheipr.Operation.Position
                 * @static
                 * @param {cheipr.Operation.IPosition} message Position message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Position.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.x != null && message.hasOwnProperty("x"))
                        writer.uint32(/* id 1, wireType 0 =*/8).int64(message.x);
                    if (message.y != null && message.hasOwnProperty("y"))
                        writer.uint32(/* id 2, wireType 0 =*/16).int64(message.y);
                    return writer;
                };
    
                /**
                 * Encodes the specified Position message, length delimited. Does not implicitly {@link cheipr.Operation.Position.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof cheipr.Operation.Position
                 * @static
                 * @param {cheipr.Operation.IPosition} message Position message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Position.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };
    
                /**
                 * Decodes a Position message from the specified reader or buffer.
                 * @function decode
                 * @memberof cheipr.Operation.Position
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {cheipr.Operation.Position} Position
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Position.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.cheipr.Operation.Position();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.x = reader.int64();
                            break;
                        case 2:
                            message.y = reader.int64();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };
    
                /**
                 * Decodes a Position message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof cheipr.Operation.Position
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {cheipr.Operation.Position} Position
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Position.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };
    
                /**
                 * Verifies a Position message.
                 * @function verify
                 * @memberof cheipr.Operation.Position
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                Position.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.x != null && message.hasOwnProperty("x"))
                        if (!$util.isInteger(message.x) && !(message.x && $util.isInteger(message.x.low) && $util.isInteger(message.x.high)))
                            return "x: integer|Long expected";
                    if (message.y != null && message.hasOwnProperty("y"))
                        if (!$util.isInteger(message.y) && !(message.y && $util.isInteger(message.y.low) && $util.isInteger(message.y.high)))
                            return "y: integer|Long expected";
                    return null;
                };
    
                /**
                 * Creates a Position message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof cheipr.Operation.Position
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {cheipr.Operation.Position} Position
                 */
                Position.fromObject = function fromObject(object) {
                    if (object instanceof $root.cheipr.Operation.Position)
                        return object;
                    var message = new $root.cheipr.Operation.Position();
                    if (object.x != null)
                        if ($util.Long)
                            (message.x = $util.Long.fromValue(object.x)).unsigned = false;
                        else if (typeof object.x === "string")
                            message.x = parseInt(object.x, 10);
                        else if (typeof object.x === "number")
                            message.x = object.x;
                        else if (typeof object.x === "object")
                            message.x = new $util.LongBits(object.x.low >>> 0, object.x.high >>> 0).toNumber();
                    if (object.y != null)
                        if ($util.Long)
                            (message.y = $util.Long.fromValue(object.y)).unsigned = false;
                        else if (typeof object.y === "string")
                            message.y = parseInt(object.y, 10);
                        else if (typeof object.y === "number")
                            message.y = object.y;
                        else if (typeof object.y === "object")
                            message.y = new $util.LongBits(object.y.low >>> 0, object.y.high >>> 0).toNumber();
                    return message;
                };
    
                /**
                 * Creates a plain object from a Position message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof cheipr.Operation.Position
                 * @static
                 * @param {cheipr.Operation.Position} message Position
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                Position.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        if ($util.Long) {
                            var long = new $util.Long(0, 0, false);
                            object.x = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                        } else
                            object.x = options.longs === String ? "0" : 0;
                        if ($util.Long) {
                            var long = new $util.Long(0, 0, false);
                            object.y = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                        } else
                            object.y = options.longs === String ? "0" : 0;
                    }
                    if (message.x != null && message.hasOwnProperty("x"))
                        if (typeof message.x === "number")
                            object.x = options.longs === String ? String(message.x) : message.x;
                        else
                            object.x = options.longs === String ? $util.Long.prototype.toString.call(message.x) : options.longs === Number ? new $util.LongBits(message.x.low >>> 0, message.x.high >>> 0).toNumber() : message.x;
                    if (message.y != null && message.hasOwnProperty("y"))
                        if (typeof message.y === "number")
                            object.y = options.longs === String ? String(message.y) : message.y;
                        else
                            object.y = options.longs === String ? $util.Long.prototype.toString.call(message.y) : options.longs === Number ? new $util.LongBits(message.y.low >>> 0, message.y.high >>> 0).toNumber() : message.y;
                    return object;
                };
    
                /**
                 * Converts this Position to JSON.
                 * @function toJSON
                 * @memberof cheipr.Operation.Position
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Position.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
    
                return Position;
            })();
    
            Operation.Track = (function() {
    
                /**
                 * Properties of a Track.
                 * @memberof cheipr.Operation
                 * @interface ITrack
                 * @property {cheipr.Operation.IPosition|null} [pos] Track pos
                 * @property {number|Long|null} [width] Track width
                 */
    
                /**
                 * Constructs a new Track.
                 * @memberof cheipr.Operation
                 * @classdesc Represents a Track.
                 * @implements ITrack
                 * @constructor
                 * @param {cheipr.Operation.ITrack=} [properties] Properties to set
                 */
                function Track(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }
    
                /**
                 * Track pos.
                 * @member {cheipr.Operation.IPosition|null|undefined} pos
                 * @memberof cheipr.Operation.Track
                 * @instance
                 */
                Track.prototype.pos = null;
    
                /**
                 * Track width.
                 * @member {number|Long} width
                 * @memberof cheipr.Operation.Track
                 * @instance
                 */
                Track.prototype.width = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
                /**
                 * Creates a new Track instance using the specified properties.
                 * @function create
                 * @memberof cheipr.Operation.Track
                 * @static
                 * @param {cheipr.Operation.ITrack=} [properties] Properties to set
                 * @returns {cheipr.Operation.Track} Track instance
                 */
                Track.create = function create(properties) {
                    return new Track(properties);
                };
    
                /**
                 * Encodes the specified Track message. Does not implicitly {@link cheipr.Operation.Track.verify|verify} messages.
                 * @function encode
                 * @memberof cheipr.Operation.Track
                 * @static
                 * @param {cheipr.Operation.ITrack} message Track message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Track.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.pos != null && message.hasOwnProperty("pos"))
                        $root.cheipr.Operation.Position.encode(message.pos, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    if (message.width != null && message.hasOwnProperty("width"))
                        writer.uint32(/* id 2, wireType 0 =*/16).int64(message.width);
                    return writer;
                };
    
                /**
                 * Encodes the specified Track message, length delimited. Does not implicitly {@link cheipr.Operation.Track.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof cheipr.Operation.Track
                 * @static
                 * @param {cheipr.Operation.ITrack} message Track message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Track.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };
    
                /**
                 * Decodes a Track message from the specified reader or buffer.
                 * @function decode
                 * @memberof cheipr.Operation.Track
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {cheipr.Operation.Track} Track
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Track.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.cheipr.Operation.Track();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.pos = $root.cheipr.Operation.Position.decode(reader, reader.uint32());
                            break;
                        case 2:
                            message.width = reader.int64();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };
    
                /**
                 * Decodes a Track message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof cheipr.Operation.Track
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {cheipr.Operation.Track} Track
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Track.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };
    
                /**
                 * Verifies a Track message.
                 * @function verify
                 * @memberof cheipr.Operation.Track
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                Track.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.pos != null && message.hasOwnProperty("pos")) {
                        var error = $root.cheipr.Operation.Position.verify(message.pos);
                        if (error)
                            return "pos." + error;
                    }
                    if (message.width != null && message.hasOwnProperty("width"))
                        if (!$util.isInteger(message.width) && !(message.width && $util.isInteger(message.width.low) && $util.isInteger(message.width.high)))
                            return "width: integer|Long expected";
                    return null;
                };
    
                /**
                 * Creates a Track message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof cheipr.Operation.Track
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {cheipr.Operation.Track} Track
                 */
                Track.fromObject = function fromObject(object) {
                    if (object instanceof $root.cheipr.Operation.Track)
                        return object;
                    var message = new $root.cheipr.Operation.Track();
                    if (object.pos != null) {
                        if (typeof object.pos !== "object")
                            throw TypeError(".cheipr.Operation.Track.pos: object expected");
                        message.pos = $root.cheipr.Operation.Position.fromObject(object.pos);
                    }
                    if (object.width != null)
                        if ($util.Long)
                            (message.width = $util.Long.fromValue(object.width)).unsigned = false;
                        else if (typeof object.width === "string")
                            message.width = parseInt(object.width, 10);
                        else if (typeof object.width === "number")
                            message.width = object.width;
                        else if (typeof object.width === "object")
                            message.width = new $util.LongBits(object.width.low >>> 0, object.width.high >>> 0).toNumber();
                    return message;
                };
    
                /**
                 * Creates a plain object from a Track message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof cheipr.Operation.Track
                 * @static
                 * @param {cheipr.Operation.Track} message Track
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                Track.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.pos = null;
                        if ($util.Long) {
                            var long = new $util.Long(0, 0, false);
                            object.width = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                        } else
                            object.width = options.longs === String ? "0" : 0;
                    }
                    if (message.pos != null && message.hasOwnProperty("pos"))
                        object.pos = $root.cheipr.Operation.Position.toObject(message.pos, options);
                    if (message.width != null && message.hasOwnProperty("width"))
                        if (typeof message.width === "number")
                            object.width = options.longs === String ? String(message.width) : message.width;
                        else
                            object.width = options.longs === String ? $util.Long.prototype.toString.call(message.width) : options.longs === Number ? new $util.LongBits(message.width.low >>> 0, message.width.high >>> 0).toNumber() : message.width;
                    return object;
                };
    
                /**
                 * Converts this Track to JSON.
                 * @function toJSON
                 * @memberof cheipr.Operation.Track
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Track.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
    
                return Track;
            })();
    
            return Operation;
        })();
    
        return cheipr;
    })();

    return $root;
});
