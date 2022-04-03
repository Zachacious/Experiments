// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

const lexer = require('./lexer');

const mathOps = {
  'PLUS': (a, b) => a + b,
  'MINUS': (a, b) => a - b,
  'MUL': (a, b) => a * b,
  'DIV': (a, b) => a / b,
  'MOD': (a, b) => a % b,
  'POW': (a, b) => a ** b,
};
var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "statements", "symbols": ["statement", "terminus"], "postprocess":  
        (data)=>{
            return [data[0]];
        }
             },
    {"name": "statements", "symbols": ["statements", (lexer.has("NL") ? {type: "NL"} : NL), "statement", "terminus"], "postprocess": 
        ([stmnts, _, stmnt])=>{
            return [...stmnts, stmnt];
        }
            },
    {"name": "statement", "symbols": ["definition"], "postprocess": id},
    {"name": "statement", "symbols": ["assignment"], "postprocess": id},
    {"name": "definition$ebnf$1$subexpression$1", "symbols": ["data_type", "__"]},
    {"name": "definition$ebnf$1", "symbols": ["definition$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "definition$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "definition", "symbols": ["def_qualifier", "__", "definition$ebnf$1", "assignment"], "postprocess":  
        ([def_qual, _, data_type, assign, terminator])=>({
            type: 'DEFINE',
            data_type: data_type?.[0] ?? '',
            qualifier: def_qual.type,
            var_name: assign.var_name,
            value: assign.value,
        })
            },
    {"name": "def_qualifier", "symbols": [{"literal":"const"}], "postprocess": 
        (data)=>({
            type: 'CONST',
        })
            },
    {"name": "def_qualifier", "symbols": [{"literal":"let"}], "postprocess": 
        (data)=>({
            type: 'LET',
        })
            },
    {"name": "assignment", "symbols": [(lexer.has("IDENT") ? {type: "IDENT"} : IDENT), "_", (lexer.has("ASSIGN_EQ") ? {type: "ASSIGN_EQ"} : ASSIGN_EQ), "_", "expression"], "postprocess":  
        (data) => ({
            type: 'ASSIGN',
            var_name: data[0],
            value: data[4],
        })
            },
    {"name": "expression", "symbols": ["expression", "_", "math", "_", "value"], "postprocess":  
        ([expr, _, op, _ws, val]) => ({
            type: 'EXPRESSION',
            op: op.type,
            left: expr,
            right: val,
        })
            },
    {"name": "expression", "symbols": ["math"], "postprocess": id},
    {"name": "expression", "symbols": ["value"], "postprocess": id},
    {"name": "math", "symbols": ["_", "AS", "_"], "postprocess": function(d) {return {type:'main', d:d, v:d[1].v}}},
    {"name": "P", "symbols": [{"literal":"("}, "_", "AS", "_", {"literal":")"}], "postprocess": function(d) {return {type:'P', d:d, v:d[2].v}}},
    {"name": "P", "symbols": ["N"], "postprocess": id},
    {"name": "E", "symbols": ["P", "_", {"literal":"**"}, "_", "E"], "postprocess": function(d) {return {type:'E', d:d, v:Math.pow(d[0].v, d[4].v)}}},
    {"name": "E", "symbols": ["P"], "postprocess": id},
    {"name": "MD", "symbols": ["MD", "_", {"literal":"*"}, "_", "E"], "postprocess": function(d) {return {type: 'M', d:d, v:d[0].v*d[4].v}}},
    {"name": "MD", "symbols": ["MD", "_", {"literal":"/"}, "_", "E"], "postprocess": function(d) {return {type: 'D', d:d, v:d[0].v/d[4].v}}},
    {"name": "MD", "symbols": ["E"], "postprocess": id},
    {"name": "AS", "symbols": ["AS", "_", {"literal":"+"}, "_", "MD"], "postprocess": function(d) {return {type:'A', d:d, v:d[0].v+d[4].v}}},
    {"name": "AS", "symbols": ["AS", "_", {"literal":"-"}, "_", "MD"], "postprocess": function(d) {return {type:'S', d:d, v:d[0].v-d[4].v}}},
    {"name": "AS", "symbols": ["MD"], "postprocess": id},
    {"name": "N", "symbols": ["value"], "postprocess": id},
    {"name": "N", "symbols": [{"literal":"sin"}, "_", "P"], "postprocess": function(d) {return {type:'sin', d:d, v:Math.sin(d[2].v)}}},
    {"name": "N", "symbols": [{"literal":"cos"}, "_", "P"], "postprocess": function(d) {return {type:'cos', d:d, v:Math.cos(d[2].v)}}},
    {"name": "N", "symbols": [{"literal":"tan"}, "_", "P"], "postprocess": function(d) {return {type:'tan', d:d, v:Math.tan(d[2].v)}}},
    {"name": "N", "symbols": [{"literal":"asin"}, "_", "P"], "postprocess": function(d) {return {type:'asin', d:d, v:Math.asin(d[2].v)}}},
    {"name": "N", "symbols": [{"literal":"acos"}, "_", "P"], "postprocess": function(d) {return {type:'acos', d:d, v:Math.acos(d[2].v)}}},
    {"name": "N", "symbols": [{"literal":"atan"}, "_", "P"], "postprocess": function(d) {return {type:'atan', d:d, v:Math.atan(d[2].v)}}},
    {"name": "N", "symbols": [{"literal":"pi"}], "postprocess": function(d) {return {type:'pi', d:d, v:Math.PI}}},
    {"name": "N", "symbols": [{"literal":"e"}], "postprocess": function(d) {return {type:'e', d:d, v:Math.E}}},
    {"name": "N", "symbols": [{"literal":"sqrt"}, "_", "P"], "postprocess": function(d) {return {type:'sqrt', d:d, v:Math.sqrt(d[2].v)}}},
    {"name": "N", "symbols": [{"literal":"ln"}, "_", "P"], "postprocess": function(d) {return {type:'ln', d:d, v:Math.log(d[2].v)}}},
    {"name": "data_type", "symbols": [(lexer.has("TYPE") ? {type: "TYPE"} : TYPE)], "postprocess": id},
    {"name": "value", "symbols": [(lexer.has("IDENT") ? {type: "IDENT"} : IDENT)], "postprocess": id},
    {"name": "value", "symbols": [(lexer.has("STRING") ? {type: "STRING"} : STRING)], "postprocess": id},
    {"name": "value", "symbols": [(lexer.has("NUM") ? {type: "NUM"} : NUM)], "postprocess": id},
    {"name": "math_ops", "symbols": [(lexer.has("PLUS") ? {type: "PLUS"} : PLUS)], "postprocess": id},
    {"name": "math_ops", "symbols": [(lexer.has("MINUS") ? {type: "MINUS"} : MINUS)], "postprocess": id},
    {"name": "math_ops", "symbols": [(lexer.has("MUL") ? {type: "MUL"} : MUL)], "postprocess": id},
    {"name": "math_ops", "symbols": [(lexer.has("DIV") ? {type: "DIV"} : DIV)], "postprocess": id},
    {"name": "math_ops", "symbols": [(lexer.has("MOD") ? {type: "MOD"} : MOD)], "postprocess": id},
    {"name": "math_ops", "symbols": [(lexer.has("POW") ? {type: "POW"} : POW)], "postprocess": id},
    {"name": "terminus", "symbols": ["_", (lexer.has("SEMICOLON") ? {type: "SEMICOLON"} : SEMICOLON)], "postprocess": id},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", (lexer.has("WS") ? {type: "WS"} : WS)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"]},
    {"name": "__$ebnf$1", "symbols": [(lexer.has("WS") ? {type: "WS"} : WS)]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", (lexer.has("WS") ? {type: "WS"} : WS)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__", "symbols": ["__$ebnf$1"]}
]
  , ParserStart: "statements"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
