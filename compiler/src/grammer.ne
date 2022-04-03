@{%
const lexer = require('./lexer');

const mathOps = {
  'PLUS': (a, b) => a + b,
  'MINUS': (a, b) => a - b,
  'MUL': (a, b) => a * b,
  'DIV': (a, b) => a / b,
  'MOD': (a, b) => a % b,
  'POW': (a, b) => a ** b,
};
%}

@lexer lexer

# program
#     -> ((statement | expression) terminus %NL:*):*

statements
    -> statement terminus 
    {% 
        (data)=>{
            return [data[0]];
        }
     %}
    | statements %NL statement terminus
    {%
        ([stmnts, _, stmnt])=>{
            return [...stmnts, stmnt];
        }
    %}

statement
    -> definition {% id %}
    | assignment {% id %}

definition
    -> def_qualifier __ (data_type __):? assignment 
    {% 
        ([def_qual, _, data_type, assign, terminator])=>({
            type: 'DEFINE',
            data_type: data_type?.[0] ?? '',
            qualifier: def_qual.type,
            var_name: assign.var_name,
            value: assign.value,
        })
    %}

def_qualifier
    -> "const"
    {%
        (data)=>({
            type: 'CONST',
        })
    %}
    | "let"
    {%
        (data)=>({
            type: 'LET',
        })
    %}

assignment
    -> %IDENT _ %ASSIGN_EQ _ expression
    {% 
        (data) => ({
            type: 'ASSIGN',
            var_name: data[0],
            value: data[4],
        })
    %}

expression
    -> expression _ math _ value 
    {% 
        ([expr, _, op, _ws, val]) => ({
            type: 'EXPRESSION',
            op: op.type,
            left: expr,
            right: val,
        })
    %}
    | math {% id %}
    | value {% id %}

# PEMDAS!
# We define each level of precedence as a nonterminal.
math -> _ AS _ {% function(d) {return {type:'main', d:d, v:d[1].v}} %}
# Parentheses
P -> "(" _ AS _ ")" {% function(d) {return {type:'P', d:d, v:d[2].v}} %}
    | N             {% id %}

# Exponents
E -> P _ "**" _ E    {% function(d) {return {type:'E', d:d, v:Math.pow(d[0].v, d[4].v)}} %}
    | P             {% id %}

# Multiplication and division
MD -> MD _ "*" _ E  {% function(d) {return {type: 'M', d:d, v:d[0].v*d[4].v}} %}
    | MD _ "/" _ E  {% function(d) {return {type: 'D', d:d, v:d[0].v/d[4].v}} %}
    | E             {% id %}

# Addition and subtraction
AS -> AS _ "+" _ MD {% function(d) {return {type:'A', d:d, v:d[0].v+d[4].v}} %}
    | AS _ "-" _ MD {% function(d) {return {type:'S', d:d, v:d[0].v-d[4].v}} %}
    | MD            {% id %}

# A number or a function of a number
N -> value          {% id %}
    | "sin" _ P     {% function(d) {return {type:'sin', d:d, v:Math.sin(d[2].v)}} %}
    | "cos" _ P     {% function(d) {return {type:'cos', d:d, v:Math.cos(d[2].v)}} %}
    | "tan" _ P     {% function(d) {return {type:'tan', d:d, v:Math.tan(d[2].v)}} %}
    
    | "asin" _ P    {% function(d) {return {type:'asin', d:d, v:Math.asin(d[2].v)}} %}
    | "acos" _ P    {% function(d) {return {type:'acos', d:d, v:Math.acos(d[2].v)}} %}
    | "atan" _ P    {% function(d) {return {type:'atan', d:d, v:Math.atan(d[2].v)}} %}

    | "pi"          {% function(d) {return {type:'pi', d:d, v:Math.PI}} %}
    | "e"           {% function(d) {return {type:'e', d:d, v:Math.E}} %}
    | "sqrt" _ P    {% function(d) {return {type:'sqrt', d:d, v:Math.sqrt(d[2].v)}} %}
    | "ln" _ P      {% function(d) {return {type:'ln', d:d, v:Math.log(d[2].v)}}  %}
####

data_type
    -> %TYPE {% id %}

value
    -> %IDENT {% id %}
    | %STRING {% id %}
    | %NUM {% id %}
    

math_ops
    -> %PLUS {% id %}
    | %MINUS {% id %}
    | %MUL {% id %}
    | %DIV {% id %}
    | %MOD {% id %}
    | %POW {% id %}

terminus
    -> _ %SEMICOLON {% id %}

_ -> %WS:*

__ -> %WS:+
