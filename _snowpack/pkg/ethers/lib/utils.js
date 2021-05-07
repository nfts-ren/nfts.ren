import { c as createCommonjsModule, a as commonjsGlobal } from '../../common/_commonjsHelpers-c99fd594.js';
import { aP as ConstructorFragment, g as EventFragment, e as Fragment, h as FunctionFragment, P as ParamType, i as FormatTypes, A as AbiCoder, d as defaultAbiCoder, I as Interface, aO as Indexed, j as checkResultErrors, J as LogDescription, K as TransactionDescription, aa as id, a8 as namehash, a9 as isValidName, aQ as messagePrefix, a7 as hashMessage, ab as TypedDataEncoder, aR as pbkdf2$1, aS as aesJs, aT as scrypt, aU as computeAddress, aV as HDNode, aW as defaultPath, aX as mnemonicToEntropy, aY as randomBytes, aZ as entropyToMnemonic, a_ as isCrowdsaleWallet, a$ as isKeystoreWallet, aA as getJsonWalletAddress, am as computeHmac, ao as ripemd160, ap as sha256, aq as sha512, aL as SupportedAlgorithm, ar as randomBytes$1, as as shuffled, a0 as _toEscapedUtf8String, a1 as toUtf8Bytes$1, a2 as toUtf8CodePoints, a3 as toUtf8String, a4 as Utf8ErrorFuncs, aN as Utf8ErrorReason, aM as UnicodeNormalizationForm$1, a5 as formatBytes32String, a6 as parseBytes32String, $ as nameprep, b0 as lib_esm$6, N as lib_esm$7, b1 as lib_esm$8, b2 as lib_esm$9, b3 as lib_esm$a, b4 as lib_esm$b, b5 as lib_esm$c, b6 as lib_esm$d, b7 as lib_esm$e, l as lib_esm$f, b8 as lib_esm$g, b9 as lib_esm$h, ba as lib_esm$i, bb as lib_esm$j, bc as lib_esm$k } from '../../common/index-9b62575f.js';
import { a as arrayify, b as hexlify, L as Logger, g as getAddress, k as keccak256, c as concat } from '../../common/index-e1fc64bd.js';
import { t as toUtf8Bytes, U as UnicodeNormalizationForm, D as Description } from '../../common/id-606cacc0.js';
import '../../common/index-93707a3a.js';
import '../../common/bn-d1fd1360.js';
import '../../common/hash-fcae10d4.js';
import '../../common/polyfill-node:global-21e5c503.js';
import '../../common/process-e9e98960.js';

var lib_esm = /*#__PURE__*/Object.freeze({
    __proto__: null,
    ConstructorFragment: ConstructorFragment,
    EventFragment: EventFragment,
    Fragment: Fragment,
    FunctionFragment: FunctionFragment,
    ParamType: ParamType,
    FormatTypes: FormatTypes,
    AbiCoder: AbiCoder,
    defaultAbiCoder: defaultAbiCoder,
    Interface: Interface,
    Indexed: Indexed,
    checkResultErrors: checkResultErrors,
    LogDescription: LogDescription,
    TransactionDescription: TransactionDescription
});

var lib_esm$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    id: id,
    namehash: namehash,
    isValidName: isValidName,
    messagePrefix: messagePrefix,
    hashMessage: hashMessage,
    _TypedDataEncoder: TypedDataEncoder
});

const version = "json-wallets/5.0.12";

function looseArrayify(hexString) {
    if (typeof (hexString) === 'string' && hexString.substring(0, 2) !== '0x') {
        hexString = '0x' + hexString;
    }
    return arrayify(hexString);
}
function zpad(value, length) {
    value = String(value);
    while (value.length < length) {
        value = '0' + value;
    }
    return value;
}
function getPassword(password) {
    if (typeof (password) === 'string') {
        return toUtf8Bytes(password, UnicodeNormalizationForm.NFKC);
    }
    return arrayify(password);
}
function searchPath(object, path) {
    let currentChild = object;
    const comps = path.toLowerCase().split('/');
    for (let i = 0; i < comps.length; i++) {
        // Search for a child object with a case-insensitive matching key
        let matchingChild = null;
        for (const key in currentChild) {
            if (key.toLowerCase() === comps[i]) {
                matchingChild = currentChild[key];
                break;
            }
        }
        // Didn't find one. :'(
        if (matchingChild === null) {
            return null;
        }
        // Now check this child...
        currentChild = matchingChild;
    }
    return currentChild;
}
// See: https://www.ietf.org/rfc/rfc4122.txt (Section 4.4)
function uuidV4(randomBytes) {
    const bytes = arrayify(randomBytes);
    // Section: 4.1.3:
    // - time_hi_and_version[12:16] = 0b0100
    bytes[6] = (bytes[6] & 0x0f) | 0x40;
    // Section 4.4
    // - clock_seq_hi_and_reserved[6] = 0b0
    // - clock_seq_hi_and_reserved[7] = 0b1
    bytes[8] = (bytes[8] & 0x3f) | 0x80;
    const value = hexlify(bytes);
    return [
        value.substring(2, 10),
        value.substring(10, 14),
        value.substring(14, 18),
        value.substring(18, 22),
        value.substring(22, 34),
    ].join("-");
}

const logger = new Logger(version);
class CrowdsaleAccount extends Description {
    isCrowdsaleAccount(value) {
        return !!(value && value._isCrowdsaleAccount);
    }
}
// See: https://github.com/ethereum/pyethsaletool
function decrypt(json, password) {
    const data = JSON.parse(json);
    password = getPassword(password);
    // Ethereum Address
    const ethaddr = getAddress(searchPath(data, "ethaddr"));
    // Encrypted Seed
    const encseed = looseArrayify(searchPath(data, "encseed"));
    if (!encseed || (encseed.length % 16) !== 0) {
        logger.throwArgumentError("invalid encseed", "json", json);
    }
    const key = arrayify(pbkdf2$1(password, password, 2000, 32, "sha256")).slice(0, 16);
    const iv = encseed.slice(0, 16);
    const encryptedSeed = encseed.slice(16);
    // Decrypt the seed
    const aesCbc = new aesJs.ModeOfOperation.cbc(key, iv);
    const seed = aesJs.padding.pkcs7.strip(arrayify(aesCbc.decrypt(encryptedSeed)));
    // This wallet format is weird... Convert the binary encoded hex to a string.
    let seedHex = "";
    for (let i = 0; i < seed.length; i++) {
        seedHex += String.fromCharCode(seed[i]);
    }
    const seedHexBytes = toUtf8Bytes(seedHex);
    const privateKey = keccak256(seedHexBytes);
    return new CrowdsaleAccount({
        _isCrowdsaleAccount: true,
        address: ethaddr,
        privateKey: privateKey
    });
}

var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const logger$1 = new Logger(version);
// Exported Types
function hasMnemonic(value) {
    return (value != null && value.mnemonic && value.mnemonic.phrase);
}
class KeystoreAccount extends Description {
    isKeystoreAccount(value) {
        return !!(value && value._isKeystoreAccount);
    }
}
function _decrypt(data, key, ciphertext) {
    const cipher = searchPath(data, "crypto/cipher");
    if (cipher === "aes-128-ctr") {
        const iv = looseArrayify(searchPath(data, "crypto/cipherparams/iv"));
        const counter = new aesJs.Counter(iv);
        const aesCtr = new aesJs.ModeOfOperation.ctr(key, counter);
        return arrayify(aesCtr.decrypt(ciphertext));
    }
    return null;
}
function _getAccount(data, key) {
    const ciphertext = looseArrayify(searchPath(data, "crypto/ciphertext"));
    const computedMAC = hexlify(keccak256(concat([key.slice(16, 32), ciphertext]))).substring(2);
    if (computedMAC !== searchPath(data, "crypto/mac").toLowerCase()) {
        throw new Error("invalid password");
    }
    const privateKey = _decrypt(data, key.slice(0, 16), ciphertext);
    if (!privateKey) {
        logger$1.throwError("unsupported cipher", Logger.errors.UNSUPPORTED_OPERATION, {
            operation: "decrypt"
        });
    }
    const mnemonicKey = key.slice(32, 64);
    const address = computeAddress(privateKey);
    if (data.address) {
        let check = data.address.toLowerCase();
        if (check.substring(0, 2) !== "0x") {
            check = "0x" + check;
        }
        if (getAddress(check) !== address) {
            throw new Error("address mismatch");
        }
    }
    const account = {
        _isKeystoreAccount: true,
        address: address,
        privateKey: hexlify(privateKey)
    };
    // Version 0.1 x-ethers metadata must contain an encrypted mnemonic phrase
    if (searchPath(data, "x-ethers/version") === "0.1") {
        const mnemonicCiphertext = looseArrayify(searchPath(data, "x-ethers/mnemonicCiphertext"));
        const mnemonicIv = looseArrayify(searchPath(data, "x-ethers/mnemonicCounter"));
        const mnemonicCounter = new aesJs.Counter(mnemonicIv);
        const mnemonicAesCtr = new aesJs.ModeOfOperation.ctr(mnemonicKey, mnemonicCounter);
        const path = searchPath(data, "x-ethers/path") || defaultPath;
        const locale = searchPath(data, "x-ethers/locale") || "en";
        const entropy = arrayify(mnemonicAesCtr.decrypt(mnemonicCiphertext));
        try {
            const mnemonic = entropyToMnemonic(entropy, locale);
            const node = HDNode.fromMnemonic(mnemonic, null, locale).derivePath(path);
            if (node.privateKey != account.privateKey) {
                throw new Error("mnemonic mismatch");
            }
            account.mnemonic = node.mnemonic;
        }
        catch (error) {
            // If we don't have the locale wordlist installed to
            // read this mnemonic, just bail and don't set the
            // mnemonic
            if (error.code !== Logger.errors.INVALID_ARGUMENT || error.argument !== "wordlist") {
                throw error;
            }
        }
    }
    return new KeystoreAccount(account);
}
function pbkdf2Sync(passwordBytes, salt, count, dkLen, prfFunc) {
    return arrayify(pbkdf2$1(passwordBytes, salt, count, dkLen, prfFunc));
}
function pbkdf2(passwordBytes, salt, count, dkLen, prfFunc) {
    return Promise.resolve(pbkdf2Sync(passwordBytes, salt, count, dkLen, prfFunc));
}
function _computeKdfKey(data, password, pbkdf2Func, scryptFunc, progressCallback) {
    const passwordBytes = getPassword(password);
    const kdf = searchPath(data, "crypto/kdf");
    if (kdf && typeof (kdf) === "string") {
        const throwError = function (name, value) {
            return logger$1.throwArgumentError("invalid key-derivation function parameters", name, value);
        };
        if (kdf.toLowerCase() === "scrypt") {
            const salt = looseArrayify(searchPath(data, "crypto/kdfparams/salt"));
            const N = parseInt(searchPath(data, "crypto/kdfparams/n"));
            const r = parseInt(searchPath(data, "crypto/kdfparams/r"));
            const p = parseInt(searchPath(data, "crypto/kdfparams/p"));
            // Check for all required parameters
            if (!N || !r || !p) {
                throwError("kdf", kdf);
            }
            // Make sure N is a power of 2
            if ((N & (N - 1)) !== 0) {
                throwError("N", N);
            }
            const dkLen = parseInt(searchPath(data, "crypto/kdfparams/dklen"));
            if (dkLen !== 32) {
                throwError("dklen", dkLen);
            }
            return scryptFunc(passwordBytes, salt, N, r, p, 64, progressCallback);
        }
        else if (kdf.toLowerCase() === "pbkdf2") {
            const salt = looseArrayify(searchPath(data, "crypto/kdfparams/salt"));
            let prfFunc = null;
            const prf = searchPath(data, "crypto/kdfparams/prf");
            if (prf === "hmac-sha256") {
                prfFunc = "sha256";
            }
            else if (prf === "hmac-sha512") {
                prfFunc = "sha512";
            }
            else {
                throwError("prf", prf);
            }
            const count = parseInt(searchPath(data, "crypto/kdfparams/c"));
            const dkLen = parseInt(searchPath(data, "crypto/kdfparams/dklen"));
            if (dkLen !== 32) {
                throwError("dklen", dkLen);
            }
            return pbkdf2Func(passwordBytes, salt, count, dkLen, prfFunc);
        }
    }
    return logger$1.throwArgumentError("unsupported key-derivation function", "kdf", kdf);
}
function decryptSync(json, password) {
    const data = JSON.parse(json);
    const key = _computeKdfKey(data, password, pbkdf2Sync, scrypt.syncScrypt);
    return _getAccount(data, key);
}
function decrypt$1(json, password, progressCallback) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = JSON.parse(json);
        const key = yield _computeKdfKey(data, password, pbkdf2, scrypt.scrypt, progressCallback);
        return _getAccount(data, key);
    });
}
function encrypt(account, password, options, progressCallback) {
    try {
        // Check the address matches the private key
        if (getAddress(account.address) !== computeAddress(account.privateKey)) {
            throw new Error("address/privateKey mismatch");
        }
        // Check the mnemonic (if any) matches the private key
        if (hasMnemonic(account)) {
            const mnemonic = account.mnemonic;
            const node = HDNode.fromMnemonic(mnemonic.phrase, null, mnemonic.locale).derivePath(mnemonic.path || defaultPath);
            if (node.privateKey != account.privateKey) {
                throw new Error("mnemonic mismatch");
            }
        }
    }
    catch (e) {
        return Promise.reject(e);
    }
    // The options are optional, so adjust the call as needed
    if (typeof (options) === "function" && !progressCallback) {
        progressCallback = options;
        options = {};
    }
    if (!options) {
        options = {};
    }
    const privateKey = arrayify(account.privateKey);
    const passwordBytes = getPassword(password);
    let entropy = null;
    let path = null;
    let locale = null;
    if (hasMnemonic(account)) {
        const srcMnemonic = account.mnemonic;
        entropy = arrayify(mnemonicToEntropy(srcMnemonic.phrase, srcMnemonic.locale || "en"));
        path = srcMnemonic.path || defaultPath;
        locale = srcMnemonic.locale || "en";
    }
    let client = options.client;
    if (!client) {
        client = "ethers.js";
    }
    // Check/generate the salt
    let salt = null;
    if (options.salt) {
        salt = arrayify(options.salt);
    }
    else {
        salt = randomBytes(32);
    }
    // Override initialization vector
    let iv = null;
    if (options.iv) {
        iv = arrayify(options.iv);
        if (iv.length !== 16) {
            throw new Error("invalid iv");
        }
    }
    else {
        iv = randomBytes(16);
    }
    // Override the uuid
    let uuidRandom = null;
    if (options.uuid) {
        uuidRandom = arrayify(options.uuid);
        if (uuidRandom.length !== 16) {
            throw new Error("invalid uuid");
        }
    }
    else {
        uuidRandom = randomBytes(16);
    }
    // Override the scrypt password-based key derivation function parameters
    let N = (1 << 17), r = 8, p = 1;
    if (options.scrypt) {
        if (options.scrypt.N) {
            N = options.scrypt.N;
        }
        if (options.scrypt.r) {
            r = options.scrypt.r;
        }
        if (options.scrypt.p) {
            p = options.scrypt.p;
        }
    }
    // We take 64 bytes:
    //   - 32 bytes   As normal for the Web3 secret storage (derivedKey, macPrefix)
    //   - 32 bytes   AES key to encrypt mnemonic with (required here to be Ethers Wallet)
    return scrypt.scrypt(passwordBytes, salt, N, r, p, 64, progressCallback).then((key) => {
        key = arrayify(key);
        // This will be used to encrypt the wallet (as per Web3 secret storage)
        const derivedKey = key.slice(0, 16);
        const macPrefix = key.slice(16, 32);
        // This will be used to encrypt the mnemonic phrase (if any)
        const mnemonicKey = key.slice(32, 64);
        // Encrypt the private key
        const counter = new aesJs.Counter(iv);
        const aesCtr = new aesJs.ModeOfOperation.ctr(derivedKey, counter);
        const ciphertext = arrayify(aesCtr.encrypt(privateKey));
        // Compute the message authentication code, used to check the password
        const mac = keccak256(concat([macPrefix, ciphertext]));
        // See: https://github.com/ethereum/wiki/wiki/Web3-Secret-Storage-Definition
        const data = {
            address: account.address.substring(2).toLowerCase(),
            id: uuidV4(uuidRandom),
            version: 3,
            Crypto: {
                cipher: "aes-128-ctr",
                cipherparams: {
                    iv: hexlify(iv).substring(2),
                },
                ciphertext: hexlify(ciphertext).substring(2),
                kdf: "scrypt",
                kdfparams: {
                    salt: hexlify(salt).substring(2),
                    n: N,
                    dklen: 32,
                    p: p,
                    r: r
                },
                mac: mac.substring(2)
            }
        };
        // If we have a mnemonic, encrypt it into the JSON wallet
        if (entropy) {
            const mnemonicIv = randomBytes(16);
            const mnemonicCounter = new aesJs.Counter(mnemonicIv);
            const mnemonicAesCtr = new aesJs.ModeOfOperation.ctr(mnemonicKey, mnemonicCounter);
            const mnemonicCiphertext = arrayify(mnemonicAesCtr.encrypt(entropy));
            const now = new Date();
            const timestamp = (now.getUTCFullYear() + "-" +
                zpad(now.getUTCMonth() + 1, 2) + "-" +
                zpad(now.getUTCDate(), 2) + "T" +
                zpad(now.getUTCHours(), 2) + "-" +
                zpad(now.getUTCMinutes(), 2) + "-" +
                zpad(now.getUTCSeconds(), 2) + ".0Z");
            data["x-ethers"] = {
                client: client,
                gethFilename: ("UTC--" + timestamp + "--" + data.address),
                mnemonicCounter: hexlify(mnemonicIv).substring(2),
                mnemonicCiphertext: hexlify(mnemonicCiphertext).substring(2),
                path: path,
                locale: locale,
                version: "0.1"
            };
        }
        return JSON.stringify(data);
    });
}

function decryptJsonWallet(json, password, progressCallback) {
    if (isCrowdsaleWallet(json)) {
        if (progressCallback) {
            progressCallback(0);
        }
        const account = decrypt(json, password);
        if (progressCallback) {
            progressCallback(1);
        }
        return Promise.resolve(account);
    }
    if (isKeystoreWallet(json)) {
        return decrypt$1(json, password, progressCallback);
    }
    return Promise.reject(new Error("invalid JSON wallet"));
}
function decryptJsonWalletSync(json, password) {
    if (isCrowdsaleWallet(json)) {
        return decrypt(json, password);
    }
    if (isKeystoreWallet(json)) {
        return decryptSync(json, password);
    }
    throw new Error("invalid JSON wallet");
}

var lib_esm$2 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    decryptCrowdsale: decrypt,
    decryptKeystore: decrypt$1,
    decryptKeystoreSync: decryptSync,
    encryptKeystore: encrypt,
    isCrowdsaleWallet: isCrowdsaleWallet,
    isKeystoreWallet: isKeystoreWallet,
    getJsonWalletAddress: getJsonWalletAddress,
    decryptJsonWallet: decryptJsonWallet,
    decryptJsonWalletSync: decryptJsonWalletSync
});

var lib_esm$3 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    computeHmac: computeHmac,
    ripemd160: ripemd160,
    sha256: sha256,
    sha512: sha512,
    get SupportedAlgorithm () { return SupportedAlgorithm; }
});

var lib_esm$4 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    randomBytes: randomBytes$1,
    shuffled: shuffled
});

var lib_esm$5 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    _toEscapedUtf8String: _toEscapedUtf8String,
    toUtf8Bytes: toUtf8Bytes$1,
    toUtf8CodePoints: toUtf8CodePoints,
    toUtf8String: toUtf8String,
    Utf8ErrorFuncs: Utf8ErrorFuncs,
    get Utf8ErrorReason () { return Utf8ErrorReason; },
    get UnicodeNormalizationForm () { return UnicodeNormalizationForm$1; },
    formatBytes32String: formatBytes32String,
    parseBytes32String: parseBytes32String,
    nameprep: nameprep
});

var utils = createCommonjsModule(function (module, exports) {
var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashMessage = exports.parseBytes32String = exports.formatBytes32String = exports.Utf8ErrorFuncs = exports.toUtf8String = exports.toUtf8CodePoints = exports.toUtf8Bytes = exports._toEscapedUtf8String = exports.nameprep = exports.hexDataSlice = exports.hexDataLength = exports.hexZeroPad = exports.hexValue = exports.hexStripZeros = exports.hexConcat = exports.isHexString = exports.hexlify = exports.base64 = exports.base58 = exports.TransactionDescription = exports.LogDescription = exports.Interface = exports.SigningKey = exports.HDNode = exports.defaultPath = exports.isBytesLike = exports.isBytes = exports.zeroPad = exports.stripZeros = exports.concat = exports.arrayify = exports.shallowCopy = exports.resolveProperties = exports.getStatic = exports.defineReadOnly = exports.deepCopy = exports.checkProperties = exports.poll = exports.fetchJson = exports._fetchData = exports.RLP = exports.Logger = exports.checkResultErrors = exports.FormatTypes = exports.ParamType = exports.FunctionFragment = exports.EventFragment = exports.Fragment = exports.defaultAbiCoder = exports.AbiCoder = void 0;
exports.Indexed = exports.Utf8ErrorReason = exports.UnicodeNormalizationForm = exports.SupportedAlgorithm = exports.mnemonicToSeed = exports.isValidMnemonic = exports.entropyToMnemonic = exports.mnemonicToEntropy = exports.verifyTypedData = exports.verifyMessage = exports.recoverPublicKey = exports.computePublicKey = exports.recoverAddress = exports.computeAddress = exports.getJsonWalletAddress = exports.serializeTransaction = exports.parseTransaction = exports.joinSignature = exports.splitSignature = exports.soliditySha256 = exports.solidityKeccak256 = exports.solidityPack = exports.shuffled = exports.randomBytes = exports.sha512 = exports.sha256 = exports.ripemd160 = exports.keccak256 = exports.computeHmac = exports.commify = exports.parseUnits = exports.formatUnits = exports.parseEther = exports.formatEther = exports.isAddress = exports.getCreate2Address = exports.getContractAddress = exports.getIcapAddress = exports.getAddress = exports._TypedDataEncoder = exports.id = exports.isValidName = exports.namehash = void 0;

Object.defineProperty(exports, "AbiCoder", { enumerable: true, get: function () { return lib_esm.AbiCoder; } });
Object.defineProperty(exports, "checkResultErrors", { enumerable: true, get: function () { return lib_esm.checkResultErrors; } });
Object.defineProperty(exports, "defaultAbiCoder", { enumerable: true, get: function () { return lib_esm.defaultAbiCoder; } });
Object.defineProperty(exports, "EventFragment", { enumerable: true, get: function () { return lib_esm.EventFragment; } });
Object.defineProperty(exports, "FormatTypes", { enumerable: true, get: function () { return lib_esm.FormatTypes; } });
Object.defineProperty(exports, "Fragment", { enumerable: true, get: function () { return lib_esm.Fragment; } });
Object.defineProperty(exports, "FunctionFragment", { enumerable: true, get: function () { return lib_esm.FunctionFragment; } });
Object.defineProperty(exports, "Indexed", { enumerable: true, get: function () { return lib_esm.Indexed; } });
Object.defineProperty(exports, "Interface", { enumerable: true, get: function () { return lib_esm.Interface; } });
Object.defineProperty(exports, "LogDescription", { enumerable: true, get: function () { return lib_esm.LogDescription; } });
Object.defineProperty(exports, "ParamType", { enumerable: true, get: function () { return lib_esm.ParamType; } });
Object.defineProperty(exports, "TransactionDescription", { enumerable: true, get: function () { return lib_esm.TransactionDescription; } });

Object.defineProperty(exports, "getAddress", { enumerable: true, get: function () { return lib_esm$6.getAddress; } });
Object.defineProperty(exports, "getCreate2Address", { enumerable: true, get: function () { return lib_esm$6.getCreate2Address; } });
Object.defineProperty(exports, "getContractAddress", { enumerable: true, get: function () { return lib_esm$6.getContractAddress; } });
Object.defineProperty(exports, "getIcapAddress", { enumerable: true, get: function () { return lib_esm$6.getIcapAddress; } });
Object.defineProperty(exports, "isAddress", { enumerable: true, get: function () { return lib_esm$6.isAddress; } });
var base64 = __importStar(lib_esm$7);
exports.base64 = base64;

Object.defineProperty(exports, "base58", { enumerable: true, get: function () { return lib_esm$8.Base58; } });

Object.defineProperty(exports, "arrayify", { enumerable: true, get: function () { return lib_esm$9.arrayify; } });
Object.defineProperty(exports, "concat", { enumerable: true, get: function () { return lib_esm$9.concat; } });
Object.defineProperty(exports, "hexConcat", { enumerable: true, get: function () { return lib_esm$9.hexConcat; } });
Object.defineProperty(exports, "hexDataSlice", { enumerable: true, get: function () { return lib_esm$9.hexDataSlice; } });
Object.defineProperty(exports, "hexDataLength", { enumerable: true, get: function () { return lib_esm$9.hexDataLength; } });
Object.defineProperty(exports, "hexlify", { enumerable: true, get: function () { return lib_esm$9.hexlify; } });
Object.defineProperty(exports, "hexStripZeros", { enumerable: true, get: function () { return lib_esm$9.hexStripZeros; } });
Object.defineProperty(exports, "hexValue", { enumerable: true, get: function () { return lib_esm$9.hexValue; } });
Object.defineProperty(exports, "hexZeroPad", { enumerable: true, get: function () { return lib_esm$9.hexZeroPad; } });
Object.defineProperty(exports, "isBytes", { enumerable: true, get: function () { return lib_esm$9.isBytes; } });
Object.defineProperty(exports, "isBytesLike", { enumerable: true, get: function () { return lib_esm$9.isBytesLike; } });
Object.defineProperty(exports, "isHexString", { enumerable: true, get: function () { return lib_esm$9.isHexString; } });
Object.defineProperty(exports, "joinSignature", { enumerable: true, get: function () { return lib_esm$9.joinSignature; } });
Object.defineProperty(exports, "zeroPad", { enumerable: true, get: function () { return lib_esm$9.zeroPad; } });
Object.defineProperty(exports, "splitSignature", { enumerable: true, get: function () { return lib_esm$9.splitSignature; } });
Object.defineProperty(exports, "stripZeros", { enumerable: true, get: function () { return lib_esm$9.stripZeros; } });

Object.defineProperty(exports, "_TypedDataEncoder", { enumerable: true, get: function () { return lib_esm$1._TypedDataEncoder; } });
Object.defineProperty(exports, "hashMessage", { enumerable: true, get: function () { return lib_esm$1.hashMessage; } });
Object.defineProperty(exports, "id", { enumerable: true, get: function () { return lib_esm$1.id; } });
Object.defineProperty(exports, "isValidName", { enumerable: true, get: function () { return lib_esm$1.isValidName; } });
Object.defineProperty(exports, "namehash", { enumerable: true, get: function () { return lib_esm$1.namehash; } });

Object.defineProperty(exports, "defaultPath", { enumerable: true, get: function () { return lib_esm$a.defaultPath; } });
Object.defineProperty(exports, "entropyToMnemonic", { enumerable: true, get: function () { return lib_esm$a.entropyToMnemonic; } });
Object.defineProperty(exports, "HDNode", { enumerable: true, get: function () { return lib_esm$a.HDNode; } });
Object.defineProperty(exports, "isValidMnemonic", { enumerable: true, get: function () { return lib_esm$a.isValidMnemonic; } });
Object.defineProperty(exports, "mnemonicToEntropy", { enumerable: true, get: function () { return lib_esm$a.mnemonicToEntropy; } });
Object.defineProperty(exports, "mnemonicToSeed", { enumerable: true, get: function () { return lib_esm$a.mnemonicToSeed; } });

Object.defineProperty(exports, "getJsonWalletAddress", { enumerable: true, get: function () { return lib_esm$2.getJsonWalletAddress; } });

Object.defineProperty(exports, "keccak256", { enumerable: true, get: function () { return lib_esm$b.keccak256; } });

Object.defineProperty(exports, "Logger", { enumerable: true, get: function () { return lib_esm$c.Logger; } });

Object.defineProperty(exports, "computeHmac", { enumerable: true, get: function () { return lib_esm$3.computeHmac; } });
Object.defineProperty(exports, "ripemd160", { enumerable: true, get: function () { return lib_esm$3.ripemd160; } });
Object.defineProperty(exports, "sha256", { enumerable: true, get: function () { return lib_esm$3.sha256; } });
Object.defineProperty(exports, "sha512", { enumerable: true, get: function () { return lib_esm$3.sha512; } });

Object.defineProperty(exports, "solidityKeccak256", { enumerable: true, get: function () { return lib_esm$d.keccak256; } });
Object.defineProperty(exports, "solidityPack", { enumerable: true, get: function () { return lib_esm$d.pack; } });
Object.defineProperty(exports, "soliditySha256", { enumerable: true, get: function () { return lib_esm$d.sha256; } });

Object.defineProperty(exports, "randomBytes", { enumerable: true, get: function () { return lib_esm$4.randomBytes; } });
Object.defineProperty(exports, "shuffled", { enumerable: true, get: function () { return lib_esm$4.shuffled; } });

Object.defineProperty(exports, "checkProperties", { enumerable: true, get: function () { return lib_esm$e.checkProperties; } });
Object.defineProperty(exports, "deepCopy", { enumerable: true, get: function () { return lib_esm$e.deepCopy; } });
Object.defineProperty(exports, "defineReadOnly", { enumerable: true, get: function () { return lib_esm$e.defineReadOnly; } });
Object.defineProperty(exports, "getStatic", { enumerable: true, get: function () { return lib_esm$e.getStatic; } });
Object.defineProperty(exports, "resolveProperties", { enumerable: true, get: function () { return lib_esm$e.resolveProperties; } });
Object.defineProperty(exports, "shallowCopy", { enumerable: true, get: function () { return lib_esm$e.shallowCopy; } });
var RLP = __importStar(lib_esm$f);
exports.RLP = RLP;

Object.defineProperty(exports, "computePublicKey", { enumerable: true, get: function () { return lib_esm$g.computePublicKey; } });
Object.defineProperty(exports, "recoverPublicKey", { enumerable: true, get: function () { return lib_esm$g.recoverPublicKey; } });
Object.defineProperty(exports, "SigningKey", { enumerable: true, get: function () { return lib_esm$g.SigningKey; } });

Object.defineProperty(exports, "formatBytes32String", { enumerable: true, get: function () { return lib_esm$5.formatBytes32String; } });
Object.defineProperty(exports, "nameprep", { enumerable: true, get: function () { return lib_esm$5.nameprep; } });
Object.defineProperty(exports, "parseBytes32String", { enumerable: true, get: function () { return lib_esm$5.parseBytes32String; } });
Object.defineProperty(exports, "_toEscapedUtf8String", { enumerable: true, get: function () { return lib_esm$5._toEscapedUtf8String; } });
Object.defineProperty(exports, "toUtf8Bytes", { enumerable: true, get: function () { return lib_esm$5.toUtf8Bytes; } });
Object.defineProperty(exports, "toUtf8CodePoints", { enumerable: true, get: function () { return lib_esm$5.toUtf8CodePoints; } });
Object.defineProperty(exports, "toUtf8String", { enumerable: true, get: function () { return lib_esm$5.toUtf8String; } });
Object.defineProperty(exports, "Utf8ErrorFuncs", { enumerable: true, get: function () { return lib_esm$5.Utf8ErrorFuncs; } });

Object.defineProperty(exports, "computeAddress", { enumerable: true, get: function () { return lib_esm$h.computeAddress; } });
Object.defineProperty(exports, "parseTransaction", { enumerable: true, get: function () { return lib_esm$h.parse; } });
Object.defineProperty(exports, "recoverAddress", { enumerable: true, get: function () { return lib_esm$h.recoverAddress; } });
Object.defineProperty(exports, "serializeTransaction", { enumerable: true, get: function () { return lib_esm$h.serialize; } });

Object.defineProperty(exports, "commify", { enumerable: true, get: function () { return lib_esm$i.commify; } });
Object.defineProperty(exports, "formatEther", { enumerable: true, get: function () { return lib_esm$i.formatEther; } });
Object.defineProperty(exports, "parseEther", { enumerable: true, get: function () { return lib_esm$i.parseEther; } });
Object.defineProperty(exports, "formatUnits", { enumerable: true, get: function () { return lib_esm$i.formatUnits; } });
Object.defineProperty(exports, "parseUnits", { enumerable: true, get: function () { return lib_esm$i.parseUnits; } });

Object.defineProperty(exports, "verifyMessage", { enumerable: true, get: function () { return lib_esm$j.verifyMessage; } });
Object.defineProperty(exports, "verifyTypedData", { enumerable: true, get: function () { return lib_esm$j.verifyTypedData; } });

Object.defineProperty(exports, "_fetchData", { enumerable: true, get: function () { return lib_esm$k._fetchData; } });
Object.defineProperty(exports, "fetchJson", { enumerable: true, get: function () { return lib_esm$k.fetchJson; } });
Object.defineProperty(exports, "poll", { enumerable: true, get: function () { return lib_esm$k.poll; } });
////////////////////////
// Enums
var sha2_2 = lib_esm$3;
Object.defineProperty(exports, "SupportedAlgorithm", { enumerable: true, get: function () { return sha2_2.SupportedAlgorithm; } });
var strings_2 = lib_esm$5;
Object.defineProperty(exports, "UnicodeNormalizationForm", { enumerable: true, get: function () { return strings_2.UnicodeNormalizationForm; } });
Object.defineProperty(exports, "Utf8ErrorReason", { enumerable: true, get: function () { return strings_2.Utf8ErrorReason; } });

});

var isAddress = utils.isAddress;
export { isAddress };
