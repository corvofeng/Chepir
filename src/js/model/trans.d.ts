import * as $protobuf from "protobufjs";
/** Namespace cheipr. */
export namespace cheipr {

    /** Properties of an Operation. */
    interface IOperation {

        /** Operation startPos */
        startPos?: (cheipr.Operation.IPosition|null);

        /** Operation startTime */
        startTime?: (number|Long|null);

        /** Operation isDraw */
        isDraw?: (boolean|null);

        /** Operation tracks */
        tracks?: (cheipr.Operation.ITrack[]|null);

        /** Operation uuid */
        uuid?: (string|null);
    }

    /** Represents an Operation. */
    class Operation implements IOperation {

        /**
         * Constructs a new Operation.
         * @param [properties] Properties to set
         */
        constructor(properties?: cheipr.IOperation);

        /** Operation startPos. */
        public startPos?: (cheipr.Operation.IPosition|null);

        /** Operation startTime. */
        public startTime: (number|Long);

        /** Operation isDraw. */
        public isDraw: boolean;

        /** Operation tracks. */
        public tracks: cheipr.Operation.ITrack[];

        /** Operation uuid. */
        public uuid: string;

        /**
         * Creates a new Operation instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Operation instance
         */
        public static create(properties?: cheipr.IOperation): cheipr.Operation;

        /**
         * Encodes the specified Operation message. Does not implicitly {@link cheipr.Operation.verify|verify} messages.
         * @param message Operation message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: cheipr.IOperation, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Operation message, length delimited. Does not implicitly {@link cheipr.Operation.verify|verify} messages.
         * @param message Operation message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: cheipr.IOperation, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an Operation message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Operation
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cheipr.Operation;

        /**
         * Decodes an Operation message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Operation
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cheipr.Operation;

        /**
         * Verifies an Operation message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an Operation message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Operation
         */
        public static fromObject(object: { [k: string]: any }): cheipr.Operation;

        /**
         * Creates a plain object from an Operation message. Also converts values to other types if specified.
         * @param message Operation
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: cheipr.Operation, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Operation to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace Operation {

        /** Properties of a Position. */
        interface IPosition {

            /** Position x */
            x?: (number|Long|null);

            /** Position y */
            y?: (number|Long|null);
        }

        /** Represents a Position. */
        class Position implements IPosition {

            /**
             * Constructs a new Position.
             * @param [properties] Properties to set
             */
            constructor(properties?: cheipr.Operation.IPosition);

            /** Position x. */
            public x: (number|Long);

            /** Position y. */
            public y: (number|Long);

            /**
             * Creates a new Position instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Position instance
             */
            public static create(properties?: cheipr.Operation.IPosition): cheipr.Operation.Position;

            /**
             * Encodes the specified Position message. Does not implicitly {@link cheipr.Operation.Position.verify|verify} messages.
             * @param message Position message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: cheipr.Operation.IPosition, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Position message, length delimited. Does not implicitly {@link cheipr.Operation.Position.verify|verify} messages.
             * @param message Position message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: cheipr.Operation.IPosition, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Position message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Position
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cheipr.Operation.Position;

            /**
             * Decodes a Position message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Position
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cheipr.Operation.Position;

            /**
             * Verifies a Position message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Position message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Position
             */
            public static fromObject(object: { [k: string]: any }): cheipr.Operation.Position;

            /**
             * Creates a plain object from a Position message. Also converts values to other types if specified.
             * @param message Position
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: cheipr.Operation.Position, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Position to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a Track. */
        interface ITrack {

            /** Track pos */
            pos?: (cheipr.Operation.IPosition|null);

            /** Track width */
            width?: (number|Long|null);
        }

        /** Represents a Track. */
        class Track implements ITrack {

            /**
             * Constructs a new Track.
             * @param [properties] Properties to set
             */
            constructor(properties?: cheipr.Operation.ITrack);

            /** Track pos. */
            public pos?: (cheipr.Operation.IPosition|null);

            /** Track width. */
            public width: (number|Long);

            /**
             * Creates a new Track instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Track instance
             */
            public static create(properties?: cheipr.Operation.ITrack): cheipr.Operation.Track;

            /**
             * Encodes the specified Track message. Does not implicitly {@link cheipr.Operation.Track.verify|verify} messages.
             * @param message Track message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: cheipr.Operation.ITrack, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Track message, length delimited. Does not implicitly {@link cheipr.Operation.Track.verify|verify} messages.
             * @param message Track message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: cheipr.Operation.ITrack, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Track message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Track
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cheipr.Operation.Track;

            /**
             * Decodes a Track message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Track
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cheipr.Operation.Track;

            /**
             * Verifies a Track message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Track message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Track
             */
            public static fromObject(object: { [k: string]: any }): cheipr.Operation.Track;

            /**
             * Creates a plain object from a Track message. Also converts values to other types if specified.
             * @param message Track
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: cheipr.Operation.Track, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Track to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }
}
