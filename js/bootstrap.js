(function ensightenInit() {
    var ensightenOptions = {
        client: "choozle",
        clientId: 923,
        publishPath: "1310",
        isPublic: 0,
        serverComponentLocation: "nexus.ensighten.com/choozle/1310/serverComponent.php",
        staticJavascriptPath: "nexus.ensighten.com/choozle/1310/code/",
        ns: 'Bootstrapper',
        nexus: "nexus.ensighten.com",
        scUseCacheBuster: "true",
        enableTagAuditBeacon: "false",
        enablePagePerfBeacon: "false",
        registryNs: "ensBootstraps",
        generatedOn: "Fri Jul 01 19:53:21 GMT 2016",
        beaconSamplingSeedValue: 11
    };
    if (!window[ensightenOptions.ns]) {
        window[ensightenOptions.registryNs] || (window[ensightenOptions.registryNs] = {});
        window[ensightenOptions.registryNs][ensightenOptions.ns] = window[ensightenOptions.ns] = function(g) {
            function m(a) {
                this.name = "DependencyNotAvailableException";
                this.message = "Dependency with id " + a + "is missing"
            }

            function n(a) {
                this.name = "BeaconException";
                this.message = "There was an error durring beacon initialization";
                a = a || {};
                this.lineNumber = a.lineNumber || a.line;
                this.fileName = a.fileName
            }

            function p() {
                for (var a = b.dataDefinitionIds.length, e = !0, d = 0; d < a; d++) {
                    var c = b.dataDefinitions[b.dataDefinitionIds[d]];
                    if (!c ||
                        null == c.endRegistration) {
                        e = !1;
                        break
                    }
                }
                e && b.callOnDataDefintionComplete()
            }
            var c = {},
                b = {};
            b.ensightenOptions = ensightenOptions;
            b.scDataObj = {};
            c.version = "1.26.0";
            c.nexus = g.nexus || "nexus.ensighten.com";
            c.rand = -1;
            c.currSec = (new Date).getSeconds();
            c.options = {
                interval: g.interval || 100,
                erLoc: g.errorLocation || c.nexus + "/error/e.gif",
                scLoc: g.serverComponentLocation || c.nexus + "/" + g.client + "/serverComponent.php",
                sjPath: g.staticJavascriptPath || c.nexus + "/" + g.client + "/code/",
                alLoc: g.alertLocation || c.nexus + "/alerts/a.gif",
                publishPath: g.publishPath,
                isPublic: g.isPublic,
                client: g.client,
                clientId: g.clientId,
                enableTagAuditBeacon: g.enableTagAuditBeacon,
                scUseCacheBuster: g.scUseCacheBuster,
                beaconSamplingSeedValue: g.beaconSamplingSeedValue || -1
            };
            c.ruleList = [];
            c.allDeploymentIds = [];
            c.runDeploymentIds = [];
            c.exceptionList = [];
            c.ensightenVariables = {};
            c.test = function(a) {
                if (!(a.executionData.hasRun || a.executionData.runTime && 0 < a.executionData.runTime.length)) {
                    for (var b = 0; b < a.dependencies.length; b++)
                        if (!1 === a.dependencies[b]()) return;
                    a.execute()
                }
            };
            m.prototype = Error();
            m.prototype || (m.prototype = {});
            m.prototype.constructor = m;
            c.DependencyNotAvailableException = m;
            n.prototype = Error();
            n.prototype || (n.prototype = {});
            n.prototype.constructor = n;
            c.BeaconException = n;
            c.checkForInvalidDependencies = function(a, e, d, l) {
                for (a = 0; a < d.length; a++)
                    if ("DEPENDENCYNEVERAVAILABLE" === d[a]) return b.currentRuleId = this.id, b.currentDeploymentId = this.deploymentId, b.reportException(new c.DependencyNotAvailableException(l[a])), e && -1 !== e && c.allDeploymentIds.push(e), !0;
                return !1
            };
            b.currentRuleId = -1;
            b.currentDeploymentId = -1;
            b.reportedErrors = [];
            b.reportedAlerts = [];
            b.AF = [];
            b._serverTime = "";
            b._clientIP = "";
            b.sampleBeacon = function() {
                var a = !1;
                try {
                    var b = (c.currSec || 0) % 20,
                        d = c.options.beaconSamplingSeedValue; - 1 === d ? a = !0 : 0 !== b && 0 === d % b && (a = !0)
                } catch (l) {}
                return a
            };
            b.getServerComponent = function(a) {
                b.callOnGetServerComponent();
                b.insertScript(window.location.protocol + "//" + c.options.scLoc, !1, a || !0, c.options.scUseCacheBuster)
            };
            b.setVariable = function(a, b) {
                c.ensightenVariables[a] =
                    b
            };
            b.getVariable = function(a) {
                return a in c.ensightenVariables ? c.ensightenVariables[a] : null
            };
            b.testAll = function() {
                for (var a = 0; a < c.ruleList.length; a++) c.test(c.ruleList[a])
            };
            b.executionState = {
                DOMParsed: !1,
                DOMLoaded: !1,
                dataDefinitionComplete: !1,
                conditionalRules: !1,
                readyForServerComponent: !1
            };
            b.reportException = function(a) {
                a.timestamp = (new Date).getTime();
                c.exceptionList.push(a);
                a = window.location.protocol + "//" + c.options.erLoc + "?msg=" + encodeURIComponent(a.message || "") + "&lnn=" + encodeURIComponent(a.lineNumber ||
                    a.line || -1) + "&fn=" + encodeURIComponent(a.fileName || "") + "&cid=" + encodeURIComponent(c.options.clientId || -1) + "&client=" + encodeURIComponent(c.options.client || "") + "&publishPath=" + encodeURIComponent(c.options.publishPath || "") + "&rid=" + encodeURIComponent(b.currentRuleId || -1) + "&did=" + encodeURIComponent(b.currentDeploymentId || -1) + "&errorName=" + encodeURIComponent(a.name || "");
                a = b.imageRequest(a);
                a.timestamp = (new Date).getTime();
                this.reportedErrors.push(a)
            };
            b.Rule = function(a) {
                this.execute = function() {
                    this.executionData.runTime.push(new Date);
                    b.currentRuleId = this.id;
                    b.currentDeploymentId = this.deploymentId;
                    try {
                        this.code()
                    } catch (a) {
                        window[ensightenOptions.ns].reportException(a)
                    } finally {
                        this.executionData.hasRun = !0, -1 !== this.deploymentId && c.runDeploymentIds.push(this.deploymentId), b.testAll()
                    }
                };
                this.id = a.id;
                this.deploymentId = a.deploymentId;
                this.dependencies = a.dependencies || [];
                this.code = a.code;
                this.executionData = {
                    hasRun: !1,
                    runTime: []
                }
            };
            b.registerRule = function(a) {
                if (b.getRule(a.id) && -1 !== a.id) return !1;
                c.ruleList.push(a); - 1 !== a.deploymentId &&
                    c.allDeploymentIds.push(a.deploymentId);
                b.testAll();
                return !0
            };
            b.getRule = function(a) {
                for (var b = 0; b < c.ruleList.length; b++)
                    if (c.ruleList[b].id === a) return c.ruleList[b];
                return !1
            };

            b.getAllDeploymentIds = function() {
                return c.allDeploymentIds
            };
            b.getRunDeploymentIds = function() {
                return c.runDeploymentIds
            };
            b.hasRuleRun = function(a) {
                return (a = b.getRule(a)) ? a.executionData.hasRun : !1
            };
            c.toTwoChar = function(a) {
                return (2 === a.toString().length ?
                    "" : "0") + a
            };
            b.Alert = function(a) {
                var b = new Date,
                    b = b.getFullYear() + "-" + c.toTwoChar(b.getMonth()) + "-" + c.toTwoChar(b.getDate()) + " " + c.toTwoChar(b.getHours()) + ":" + c.toTwoChar(b.getMinutes()) + ":" + c.toTwoChar(b.getSeconds());
                this.severity = a.severity || 1;
                this.subject = a.subject || "";
                this.type = a.type || 1;
                this.ruleId = a.ruleId || -1;
                this.severity = encodeURIComponent(this.severity);
                this.date = encodeURIComponent(b);
                this.subject = encodeURIComponent(this.subject);
                this.type = encodeURIComponent(this.type)
            };
            b.generateAlert = function(a) {
                a =
                    b.imageRequest(window.location.protocol + "//" + c.options.alLoc + "?d=" + a.date + "&su=" + a.subject + "&se=" + a.severity + "&t=" + a.type + "&cid=" + c.options.clientId + "&client=" + c.options.client + "&publishPath=" + c.options.publishPath + "&rid=" + b.currentRuleId + "&did=" + b.currentDeploymentId);
                a.timestamp = (new Date).getTime();
                this.reportedAlerts.push(a)
            };
            b.imageRequest = function(a) {
                var b = new Image(0, 0);
                b.src = a;
                return b
            };
            b.insertScript = function(a, e, d, l) {
                var h = document.getElementsByTagName("script"),
                    f;
                l = void 0 !== l ? l : !0;
                if (void 0 !==
                    e ? e : 1)
                    for (f = 0; f < h.length; f++)
                        if (h[f].src === a && h[f].readyState && /loaded|complete/.test(h[f].readyState)) return;
                if (d) {
                    d = 1 == d && "object" == typeof b.scDataObj ? b.scDataObj : d;
                    c.rand = Math.random() * ("1E" + (10 * Math.random()).toFixed(0));
                    e = window.location.href;
                    "object" === typeof d && d.PageID && (e = d.PageID, delete d.PageID);
                    if ("object" === typeof d)
                        for (f in d) {
                            f = ~e.indexOf("#") ? e.slice(e.indexOf("#"), e.length) : "";
                            e = e.slice(0, f.length ? e.length - f.length : e.length);
                            e += ~e.indexOf("?") ? "&" : "?";
                            for (k in d) e += k + "=" + d[k] + "&";
                            e = e.slice(0, -1) + f;
                            break
                        }
                    a += "?";
                    l && (a += "r=" + c.rand + "&");
                    a += "ClientID=" + encodeURIComponent(c.options.clientId) + "&PageID=" + encodeURIComponent(e)
                }(function(a, b, e) {
                    var d = b.head || b.getElementsByTagName("head");
                    setTimeout(function() {
                        if ("item" in d) {
                            if (!d[0]) {
                                setTimeout(arguments.callee, 25);
                                return
                            }
                            d = d[0]
                        }
                        var a = b.createElement("script");
                        a.src = e;
                        a.onload = a.onerror = function() {
                            this.addEventListener && (this.readyState = "loaded")
                        };
                        d.insertBefore(a, d.firstChild)
                    }, 0)
                })(window, document, a)
            };
            b.loadScriptCallback = function(a,
                b, d) {
                var c = document.getElementsByTagName("script"),
                    h;
                d = c[0];
                for (h = 0; h < c.length; h++)
                    if (c[h].src === a && c[h].readyState && /loaded|complete/.test(c[h].readyState)) try {
                        b()
                    } catch (f) {
                        window[ensightenOptions.ns].reportException(f)
                    } finally {
                        return
                    }
                c = document.createElement("script");
                c.type = "text/javascript";
                c.async = !0;
                c.src = a;
                c.onerror = function() {
                    this.addEventListener && (this.readyState = "loaded")
                };
                c.onload = c.onreadystatechange = function() {
                    if (!this.readyState || "complete" === this.readyState || "loaded" === this.readyState) {
                        this.onload =
                            this.onreadystatechange = null;
                        this.addEventListener && (this.readyState = "loaded");
                        try {
                            b.call(this)
                        } catch (a) {
                            window[ensightenOptions.ns].reportException(a)
                        }
                    }
                };
                d.parentNode.insertBefore(c, d)
            };
            b.unobtrusiveAddEvent = function(a, b, d) {
                try {
                    var c = a[b] ? a[b] : function() {};
                    a[b] = function() {
                        d.apply(this, arguments);
                        return c.apply(this, arguments)
                    }
                } catch (h) {
                    window[ensightenOptions.ns].reportException(h)
                }
            };
            b.anonymous = function(a, e) {
                return function() {
                    try {
                        b.currentRuleId = e ? e : "anonymous", a()
                    } catch (d) {
                        window[ensightenOptions.ns].reportException(d)
                    }
                }
            };
            b.setCurrentRuleId = function(a) {
                b.currentRuleId = a
            };
            b.setCurrentDeploymentId = function(a) {
                b.currentDeploymentId = a
            };
            b.bindImmediate = function(a, e, d) {
                if ("function" === typeof a) a = new b.Rule({
                    id: e || -1,
                    deploymentId: d || -1,
                    dependencies: [],
                    code: a
                });
                else if ("object" !== typeof a) return !1;
                b.registerRule(a)
            };
            b.bindDOMParsed = function(a, e, d) {
                if ("function" === typeof a) a = new b.Rule({
                    id: e || -1,
                    deploymentId: d || -1,
                    dependencies: [function() {
                        return window[ensightenOptions.ns].executionState.DOMParsed
                    }],
                    code: a
                });
                else if ("object" !==
                    typeof a) return !1;
                b.registerRule(a)
            };
            b.bindDOMLoaded = function(a, e, d) {
                if ("function" === typeof a) a = new b.Rule({
                    id: e || -1,
                    deploymentId: d || -1,
                    dependencies: [function() {
                        return window[ensightenOptions.ns].executionState.DOMLoaded
                    }],
                    code: a
                });
                else if ("object" !== typeof a) return !1;
                b.registerRule(a)
            };
            b.bindPageSpecificCompletion = function(a, e, d) {
                if ("function" === typeof a) a = new b.Rule({
                    id: e || -1,
                    deploymentId: d || -1,
                    dependencies: [function() {
                        return window[ensightenOptions.ns].executionState.conditionalRules
                    }],
                    code: a
                });
                else if ("object" !== typeof a) return !1;
                b.registerRule(a)
            };
            b.bindOnGetServerComponent = function(a, e, d) {
                if ("function" === typeof a) a = new b.Rule({
                    id: e || -1,
                    deploymentId: d || -1,
                    dependencies: [function() {
                        return window[ensightenOptions.ns].executionState.readyForServerComponent
                    }],
                    code: a
                });
                else if ("object" !== typeof a) return !1;
                b.registerRule(a)
            };
            b.bindDataDefinitionComplete = function(a, e, d) {
                if ("function" === typeof a) a = new b.Rule({
                    id: e || -1,
                    deploymentId: d || -1,
                    dependencies: [function() {
                        return window[ensightenOptions.ns].executionState.dataDefinitionComplete
                    }],
                    code: a
                });
                else if ("object" !== typeof a) return !1;
                b.registerRule(a)
            };
            b.checkHasRun = function(a) {
                if (0 === a.length) return !0;
                for (var e, d = 0; d < a.length; ++d)
                    if (e = b.getRule(parseInt(a[d], 10)), !e || !e.executionData.hasRun) return !1;
                return !0
            };
            b.bindDependencyImmediate = function(a, e, d, l, h) {
                var f = [];
                if (!c.checkForInvalidDependencies(e, l, d, h)) {
                    f.push(function() {
                        return window[ensightenOptions.ns].checkHasRun(d)
                    });
                    if ("function" === typeof a) a = new b.Rule({
                        id: e || -1,
                        deploymentId: l || -1,
                        dependencies: f,
                        code: a
                    });
                    else if ("object" !==
                        typeof a) return !1;
                    b.registerRule(a)
                }
            };
            b.bindDependencyDOMLoaded = function(a, e, d, l, h) {
                var f = [];
                if (!c.checkForInvalidDependencies(e, l, d, h)) {
                    f.push(function() {
                        return window[ensightenOptions.ns].executionState.DOMLoaded
                    });
                    f.push(function() {
                        return window[ensightenOptions.ns].checkHasRun(d)
                    });
                    if ("function" === typeof a) a = new b.Rule({
                        id: e || -1,
                        deploymentId: l || -1,
                        dependencies: f,
                        code: a
                    });
                    else if ("object" !== typeof a) return !1;
                    b.registerRule(a)
                }
            };
            b.bindDependencyDOMParsed = function(a, e, d, l, h) {
                var f = [];
                if (!c.checkForInvalidDependencies(e,
                        l, d, h)) {
                    f.push(function() {
                        return window[ensightenOptions.ns].executionState.DOMParsed
                    });
                    f.push(function() {
                        return window[ensightenOptions.ns].checkHasRun(d)
                    });
                    if ("function" === typeof a) a = new b.Rule({
                        id: e || -1,
                        deploymentId: l || -1,
                        dependencies: f,
                        code: a
                    });
                    else if ("object" !== typeof a) return !1;
                    b.registerRule(a)
                }
            };
            b.bindDependencyPageSpecificCompletion = function(a, e, d, l, h) {
                var f = [];
                if (!c.checkForInvalidDependencies(e, l, d, h)) {
                    f.push(function() {
                        return window[ensightenOptions.ns].executionState.conditionalRules
                    });
                    f.push(function() {
                        return window[ensightenOptions.ns].checkHasRun(d)
                    });
                    if ("function" === typeof a) a = new b.Rule({
                        id: e || -1,
                        deploymentId: l || -1,
                        dependencies: f,
                        code: a
                    });
                    else if ("object" !== typeof a) return !1;
                    b.registerRule(a)
                }
            };
            b.bindDependencyOnGetServerComponent = function(a, e, d, l, h) {
                var f = [];
                if (!c.checkForInvalidDependencies(e, l, d, h)) {
                    f.push(function() {
                        return window[ensightenOptions.ns].executionState.readyForServerComponent
                    });
                    f.push(function() {
                        return window[ensightenOptions.ns].checkHasRun(d)
                    });
                    if ("function" ===
                        typeof a) a = new b.Rule({
                        id: e || -1,
                        deploymentId: l || -1,
                        dependencies: f,
                        code: a
                    });
                    else if ("object" !== typeof a) return !1;
                    b.registerRule(a)
                }
            };
            b.bindDependencyPageSpecificCompletion = function(a, e, d, l, h) {
                var f = [];
                if (!c.checkForInvalidDependencies(e, l, d, h)) {
                    f.push(function() {
                        return window[ensightenOptions.ns].executionState.dataDefinitionComplete
                    });
                    f.push(function() {
                        return window[ensightenOptions.ns].checkHasRun(d)
                    });
                    if ("function" === typeof a) a = new b.Rule({
                        id: e || -1,
                        deploymentId: l || -1,
                        dependencies: f,
                        code: a
                    });
                    else if ("object" !==
                        typeof a) return !1;
                    b.registerRule(a)
                }
            };
            b.dataDefintionIds = [];
            b.dataDefinitions = [];
            b.pageSpecificDataDefinitionsSet = !1;
            b.setPageSpecificDataDefinitionIds = function(a) {
                for (var e = a.length, d = 0; d < e; d++) {
                    var c = a[d];
                    if (Array.prototype.indexOf) - 1 == b.dataDefinitionIds.indexOf(c) && b.dataDefinitionIds.push(c);
                    else {
                        for (var h = !1, f = b.dataDefinitionIds.length, g = 0; g < f; g++)
                            if (b.dataDefinitionIds[g] === c) {
                                h = !0;
                                break
                            }
                        h || b.dataDefinitionIds.push(c)
                    }
                }
                b.pageSpecificDataDefinitionsSet = !0;
                p()
            };
            b.DataDefinition = function(a, b) {
                this.id =
                    a;
                this.registrationFn = b;
                this.endRegistrationTime = this.startRegistrationTime = null;
                this.startRegistration = function() {
                    this.startRegistrationTime = new Date
                };
                this.endRegistration = function() {
                    this.endRegistrationTime = new Date
                }
            };
            b.registerDataDefinition = function(a, e) {
                var d = b.dataDefinitions[e];
                d || (d = new b.DataDefinition(e, a), b.dataDefinitions[e] = d);
                d.startRegistrationTime || (d.startRegistration(), d.registrationFn(), d.endRegistration());
                b.pageSpecificDataDefinitionsSet && p()
            };
            b.callOnDataDefintionComplete = function() {
                b.executionState.dataDefinitionComplete = !0;
                b.testAll()
            };
            b.callOnDOMParsed = function() {
                window[ensightenOptions.ns].executionState.DOMParsed = !0;
                window[ensightenOptions.ns].testAll()
            };
            b.callOnDOMLoaded = function() {
                window[ensightenOptions.ns].executionState.DOMParsed = !0;
                window[ensightenOptions.ns].executionState.DOMLoaded = !0;
                window[ensightenOptions.ns].testAll()
            };
            b.callOnPageSpecificCompletion = function() {
                for (var a = document.getElementsByTagName("script"), b = 0, d = a.length; b < d; b++)
                    if (a[b].src.match(/\.ensighten\.com\/(.+?)\/code\/.*/i) && "loaded" !=
                        a[b].readyState && "complete" != a[b].readyState) {
                        setTimeout(window[ensightenOptions.ns].callOnPageSpecificCompletion, 50);
                        return
                    }
                setTimeout(function() {
                    window[ensightenOptions.ns].executionState.conditionalRules = !0;
                    window[ensightenOptions.ns].testAll()
                }, 1)
            };
            b.callOnGetServerComponent = function() {
                window[ensightenOptions.ns].executionState.readyForServerComponent = !0;
                window[ensightenOptions.ns].testAll()
            };
            b.hasDOMParsed = function() {
                return window[ensightenOptions.ns].executionState.DOMParsed
            };
            b.hasDOMLoaded =
                function() {
                    return window[ensightenOptions.ns].executionState.DOMLoaded
                };
            b.hasPageSpecificCompletion = function() {
                return window[ensightenOptions.ns].executionState.conditionalRules
            };
            var q = function() {
                var a = [],
                    b = !1,
                    d = !1;
                return {
                    add: function(c) {
                        b && !d ? c() : "function" == typeof c && (a[a.length] = c)
                    },
                    exec: function() {
                        d = !0;
                        do {
                            var c = a;
                            a = [];
                            b = !0;
                            for (var g = 0; g < c.length; g++) try {
                                c[g].call(window)
                            } catch (f) {
                                window[ensightenOptions.ns].reportException(f)
                            }
                        } while (0 < a.length);
                        d = !1
                    },
                    haveRun: function() {
                        return b
                    }
                }
            };
            b.new_fArray =
                function() {
                    return q()
                };
            c.timer = null;
            (function() {
                function a(a, b) {
                    return function() {
                        a.apply(b, arguments)
                    }
                }
                window.console || (window.console = {});
                var b = window.console;
                if (!b.log)
                    if (window.log4javascript) {
                        var c = log4javascript.getDefaultLogger();
                        b.log = a(c.info, c);
                        b.debug = a(c.debug, c);
                        b.info = a(c.info, c);
                        b.warn = a(c.warn, c);
                        b.error = a(c.error, c)
                    } else b.log = function() {};
                b.debug || (b.debug = b.log);
                b.info || (b.info = b.log);
                b.warn || (b.warn = b.log);
                b.error || (b.error = b.log)
            })();
            document.addEventListener ? (-1 < navigator.userAgent.indexOf("AppleWebKit/") ?
                c.timer = window.setInterval(function() {
                    /loaded|interactive|complete/.test(document.readyState) && (clearInterval(c.timer), b.callOnDOMParsed())
                }, 50) : document.addEventListener("DOMContentLoaded", b.callOnDOMParsed, !1), window.addEventListener("load", b.callOnDOMLoaded, !1)) : (setTimeout(function() {
                var a = window.document;
                (function() {
                    try {
                        if (!document.body) throw "continue";
                        a.documentElement.doScroll("left")
                    } catch (b) {
                        setTimeout(arguments.callee, 15);
                        return
                    }
                    window[ensightenOptions.ns].callOnDOMParsed()
                })()
            }, 1), window.attachEvent("onload",
                function() {
                    window[ensightenOptions.ns].callOnDOMLoaded()
                }));
            "true" === c.options.enableTagAuditBeacon && b.sampleBeacon() && window.setTimeout(function() {
                if (window[ensightenOptions.ns] && !window[ensightenOptions.ns].mobilePlatform) try {
                    for (var a = [], e, d, l, h, f = 0; f < c.ruleList.length; ++f) d = c.ruleList[f], l = d.executionData.hasRun ? "1" : "0", h = d.deploymentId.toString() + "|" + d.id.toString() + "|" + l, a.push(h);
                    e = "[" + a.join(";") + "]";
                    var m = window.location.protocol + "//" + c.nexus + "/" + encodeURIComponent(g.client) + "/" + encodeURIComponent(g.publishPath) +
                        "/TagAuditBeacon.rnc?cid=" + encodeURIComponent(g.clientId) + "&data=" + e + "&idx=0&r=" + c.rand;
                    b.imageRequest(m)
                } catch (n) {
                    b.currentRuleId = -1, b.currentDeploymentId = -1, a = new c.BeaconException(n), window[ensightenOptions.ns].reportException(a)
                }
            }, 3E3);
            window.setInterval(b.testAll, c.options.interval);
            return b
        }(ensightenOptions);
        "true" === ensightenOptions.enablePagePerfBeacon && window[ensightenOptions.ns] && window[ensightenOptions.ns].sampleBeacon() && window[ensightenOptions.ns].bindDOMParsed(function() {
            if (!window[ensightenOptions.ns].mobilePlatform) {
                var g = window.performance;
                if (g) {
                    var g = g.timing || {},
                        m = "",
                        n = g.navigationStart || 0,
                        p, c = {
                            connectEnd: "ce",
                            connectStart: "cs",
                            domComplete: "dc",
                            domContentLoadedEventEnd: "dclee",
                            domContentLoadedEventStart: "dcles",
                            domInteractive: "di",
                            domLoading: "dl",
                            domainLookupEnd: "dle",
                            domainLookupStart: "dls",
                            fetchStart: "fs",
                            loadEventEnd: "lee",
                            loadEventStart: "les",
                            redirectEnd: "rede",
                            redirectStart: "reds",
                            requestStart: "reqs",
                            responseStart: "resps",
                            responseEnd: "respe",
                            secureConnectionStart: "scs",
                            unloadEventStart: "ues",
                            unloadEventEnd: "uee"
                        },
                        m = "&ns=" + encodeURIComponent(g.navigationStart),
                        b;
                    for (b in c) void 0 !== g[b] ? (p = g[b] - n, m += "&" + c[b] + "=" + (0 < p ? encodeURIComponent(p) : 0)) : m += "&" + c[b] + "=-1";
                    window[ensightenOptions.ns].timing = m;
                    b = ensightenOptions.nexus || "nexus.ensighten.com";
                    g = ensightenOptions.staticJavascriptPath ||
                        "";
                    m = g.indexOf(".com/");
                    n = g.indexOf("/code/");
                    g = g.substring(m + 4, n) + "/perf.rnc";
                    g += "?cid=" + encodeURIComponent(ensightenOptions.clientId) + window[ensightenOptions.ns].timing;
                    window[ensightenOptions.ns].imageRequest("//" + b + g)
                }
            }
        });

        window[ensightenOptions.ns].ensEvent = function(l, u) {
            var k = {
                queue: {},
                pollQueue: {},
                pushTrigger: function(b, g) {
                    if ("[object Array]" === Object.prototype.toString.call(b)) {
                        for (var d = 0; d < b.length; d++) k.pushTrigger(b[d], g);
                        return !0
                    }
                    if ("string" != typeof b) return !1;
                    this.queue[b] = this.queue[b] || {
                        fn: []
                    };
                    "function" == typeof g && this.queue[b].fn.push(g);
                    return !0
                },
                callTrigger: function(b, g, d) {
                    if ("string" != typeof b) return !1;
                    b = k.queue[b];
                    if ("object" == typeof b && b.fn && b.fn.length && (0 != b.fireOnFirstSet && g == u || g != u && 0 != b.fireOnUpdate))
                        for (g =
                            0; g < b.fn.length; g++) b.fn[g].call(this)
                },
                setPollOptions: function(b, g, d) {
                    this.queue[b] = this.queue[b] || {
                        fn: []
                    };
                    this.queue[b].fireOnFirstSet = g;
                    this.queue[b].fireOnUpdate = d
                },
                callPoll: function(b, g, d, l, t) {
                    if ("string" == typeof b && g && g.length && !(1 > g.length)) {
                        for (var p = 0; p < g.length; p++) k.setPollOptions(g[p], l, t);
                        k.pushWatch(b, g, d)
                    }
                },
                pushWatch: function(b, g, d) {
                    this.pollQueue[b] || (this.pollQueue[b] = {
                        previousVal: u,
                        eventArr: [],
                        valueFn: d
                    });
                    this.pollQueue[b].eventArr = this.pollQueue[b].eventArr.concat(g);
                    this.pollQueue[b].valueFn =
                        d
                },
                globalWatch: function() {
                    setInterval(function() {
                        for (key in k.pollQueue) {
                            var b = k.pollQueue[key],
                                g = b.valueFn(key);
                            if (b.previousVal !== g) {
                                for (var d = 0; d < b.eventArr.length; d++) k.callTrigger.call(l, b.eventArr[d], b.previousVal, g);
                                k.pollQueue[key].previousVal = g
                            }
                        }
                    }, 500)
                }
            };
            k.globalWatch();
            return {
                add: function(b, g) {
                    return k.pushTrigger(b, g)
                },
                get: function(b) {
                    return k.queue[b]
                },
                trigger: function(b, g) {
                    return k.callTrigger.call(g || l, b)
                },
                poll: function(b, g, d, u, t) {
                    t = t || l[ensightenOptions.ns].data.resolve;
                    return k.callPoll(b,
                        g, t, d, u)
                }
            }
        }(window);
        (function(l, u, k) {
            u[l] = k()
        })("qwery", window[ensightenOptions.ns], function() {
            function l() {
                this.c = {}
            }

            function u(a) {
                return G.g(a) || G.s(a, "(^|\\s+)" + a + "(\\s+|$)", 1)
            }

            function k(a, e) {
                for (var f = 0, c = a.length; f < c; f++) e(a[f])
            }

            function b(a) {
                for (var e = [], f = 0, c = a.length; f < c; ++f) s(a[f]) ? e = e.concat(a[f]) : e[e.length] = a[f];
                return e
            }

            function g(a) {
                for (var e = 0, f = a.length, c = []; e < f; e++) c[e] = a[e];
                return c
            }

            function d(a) {
                for (;
                    (a = a.previousSibling) && 1 != a.nodeType;);
                return a
            }

            function x(a) {
                return a.match(N)
            }

            function t(a, e, f,
                c, b, r, h, g, d, k, s) {
                var n, y, l;
                if (1 !== this.nodeType || e && "*" !== e && this.tagName && this.tagName.toLowerCase() !== e || f && (n = f.match(O)) && n[1] !== this.id) return !1;
                if (f && (l = f.match(P)))
                    for (a = l.length; a--;)
                        if (!u(l[a].slice(1)).test(this.className)) return !1;
                if (d && m.pseudos[d] && !m.pseudos[d](this, s)) return !1;
                if (c && !h)
                    for (y in d = this.attributes, d)
                        if (Object.prototype.hasOwnProperty.call(d, y) && (d[y].name || y) == b) return this;
                return c && !q(r, Q(this, b) || "", h) ? !1 : this
            }

            function p(a) {
                return H.g(a) || H.s(a, a.replace(R, "\\$1"))
            }

            function q(a, e, f) {
                switch (a) {
                    case "=":
                        return e == f;
                    case "^=":
                        return e.match(w.g("^=" + f) || w.s("^=" + f, "^" + p(f), 1));
                    case "$=":
                        return e.match(w.g("$=" + f) || w.s("$=" + f, p(f) + "$", 1));
                    case "*=":
                        return e.match(w.g(f) || w.s(f, p(f), 1));
                    case "~=":
                        return e.match(w.g("~=" + f) || w.s("~=" + f, "(?:^|\\s+)" + p(f) + "(?:\\s+|$)", 1));
                    case "|=":
                        return e.match(w.g("|=" + f) || w.s("|=" + f, "^" + p(f) + "(-|$)", 1))
                }
                return 0
            }

            function v(a, e) {
                var f = [],
                    b = [],
                    r, h, g, d, m, s = e,
                    n = C.g(a) || C.s(a, a.split(I)),
                    l = a.match(J);
                if (!n.length) return f;
                h = (n = n.slice(0)).pop();
                n.length && (r = n[n.length - 1].match(K)) && (s = y(e, r[1]));
                if (!s) return f;
                d = x(h);
                g = s !== e && 9 !== s.nodeType && l && /^[+~]$/.test(l[l.length - 1]) ? function(a) {
                    for (; s = s.nextSibling;) 1 == s.nodeType && (d[1] ? d[1] == s.tagName.toLowerCase() : 1) && (a[a.length] = s);
                    return a
                }([]) : s.getElementsByTagName(d[1] || "*");
                r = 0;
                for (h = g.length; r < h; r++)
                    if (m = t.apply(g[r], d)) f[f.length] = m;
                if (!n.length) return f;
                k(f, function(a) {
                    c(a, n, l) && (b[b.length] = a)
                });
                return b
            }

            function c(a, e, f, c) {
                function b(a, c, d) {
                    for (; d = S[f[c]](d, a);)
                        if (r(d) && t.apply(d, x(e[c])))
                            if (c) {
                                if (h =
                                    b(d, c - 1, d)) return h
                            } else return d
                }
                var h;
                return (h = b(a, e.length - 1, a)) && (!c || A(h, c))
            }

            function r(a, e) {
                return a && "object" === typeof a && (e = a.nodeType) && (1 == e || 9 == e)
            }

            function h(a) {
                var e = [],
                    f, c;
                f = 0;
                a: for (; f < a.length; ++f) {
                    for (c = 0; c < e.length; ++c)
                        if (e[c] == a[f]) continue a;
                    e[e.length] = a[f]
                }
                return e
            }

            function s(a) {
                return "object" === typeof a && isFinite(a.length)
            }

            function y(a, e, f) {
                return 9 === a.nodeType ? a.getElementById(e) : a.ownerDocument && ((f = a.ownerDocument.getElementById(e)) && A(f, a) && f || !A(a, a.ownerDocument) && E('[id="' +
                    e + '"]', a)[0])
            }

            function m(a, e) {
                var f, c, h;
                h = e ? "string" == typeof e ? m(e)[0] : !e.nodeType && s(e) ? e[0] : e : z;
                if (!h || !a) return [];
                if (a === window || r(a)) return !e || a !== window && r(h) && A(a, h) ? [a] : [];
                if (a && s(a)) return b(a);
                if (f = a.match(T)) {
                    if (f[1]) return (c = y(h, f[1])) ? [c] : [];
                    if (f[2]) return g(h.getElementsByTagName(f[2]));
                    if (U && f[3]) return g(h.getElementsByClassName(f[3]))
                }
                return E(a, h)
            }

            function n(a, e) {
                return function(f) {
                    var c, b;
                    L.test(f) ? 9 !== a.nodeType && ((b = c = a.getAttribute("id")) || a.setAttribute("id", b = "__qwerymeupscotty"),
                        e(a.parentNode || a, '[id="' + b + '"]' + f, !0), c || a.removeAttribute("id")) : f.length && e(a, f, !1)
                }
            }
            var z = document,
                D = z.documentElement,
                E, O = /#([\w\-]+)/,
                P = /\.[\w\-]+/g,
                K = /^#([\w\-]+)$/,
                V = /^([\w]+)?\.([\w\-]+)$/,
                L = /(^|,)\s*[>~+]/,
                W = /^\s+|\s*([,\s\+\~>]|$)\s*/g,
                B = /[\s\>\+\~]/,
                M = /(?![\s\w\-\/\?\&\=\:\.\(\)\!,@#%<>\{\}\$\*\^'"]*\]|[\s\w\+\-]*\))/,
                R = /([.*+?\^=!:${}()|\[\]\/\\])/g,
                T = new RegExp(K.source + "|" + /^([\w\-]+)$/.source + "|" + /^\.([\w\-]+)$/.source),
                J = new RegExp("(" + B.source + ")" + M.source, "g"),
                I = new RegExp(B.source +
                    M.source),
                N = new RegExp(/^(\*|[a-z0-9]+)?(?:([\.\#]+[\w\-\.#]+)?)/.source + "(" + /\[([\w\-]+)(?:([\|\^\$\*\~]?\=)['"]?([ \w\-\/\?\&\=\:\.\(\)\!,@#%<>\{\}\$\*\^]+)["']?)?\]/.source + ")?(" + /:([\w\-]+)(\(['"]?([^()]+)['"]?\))?/.source + ")?"),
                S = {
                    " ": function(a) {
                        return a && a !== D && a.parentNode
                    },
                    ">": function(a, e) {
                        return a && a.parentNode == e.parentNode && a.parentNode
                    },
                    "~": function(a) {
                        return a && a.previousSibling
                    },
                    "+": function(a, e, f, c) {
                        return a ? (f = d(a)) && (c = d(e)) && f == c && f : !1
                    }
                };
            l.prototype = {
                g: function(a) {
                    return this.c[a] ||
                        void 0
                },
                s: function(a, e, f) {
                    e = f ? new RegExp(e) : e;
                    return this.c[a] = e
                }
            };
            var G = new l,
                H = new l,
                w = new l,
                C = new l,
                A = "compareDocumentPosition" in D ? function(a, e) {
                    return 16 == (e.compareDocumentPosition(a) & 16)
                } : "contains" in D ? function(a, e) {
                    e = 9 === e.nodeType || e == window ? D : e;
                    return e !== a && e.contains(a)
                } : function(a, e) {
                    for (; a = a.parentNode;)
                        if (a === e) return 1;
                    return 0
                },
                Q = function() {
                    var a = z.createElement("p");
                    return (a.innerHTML = '<a href="#x">x</a>', "#x" != a.firstChild.getAttribute("href")) ? function(a, f) {
                        return "class" === f ?
                            a.className : "href" === f || "src" === f ? a.getAttribute(f, 2) : a.getAttribute(f)
                    } : function(a, f) {
                        return a.getAttribute(f)
                    }
                }(),
                U = !!z.getElementsByClassName,
                X = z.querySelector && z.querySelectorAll,
                Y = function(a, e) {
                    var f = [],
                        c, b;
                    try {
                        if (9 === e.nodeType || !L.test(a)) return g(e.querySelectorAll(a));
                        k(c = a.split(","), n(e, function(a, e) {
                            b = a.querySelectorAll(e);
                            1 == b.length ? f[f.length] = b.item(0) : b.length && (f = f.concat(g(b)))
                        }));
                        return 1 < c.length && 1 < f.length ? h(f) : f
                    } catch (r) {}
                    return F(a, e)
                },
                F = function(a, e) {
                    var f = [],
                        c, b, r, d;
                    a = a.replace(W,
                        "$1");
                    if (c = a.match(V)) {
                        d = u(c[2]);
                        c = e.getElementsByTagName(c[1] || "*");
                        b = 0;
                        for (r = c.length; b < r; b++) d.test(c[b].className) && (f[f.length] = c[b]);
                        return f
                    }
                    k(c = a.split(","), n(e, function(a, c, h) {
                        d = v(c, a);
                        b = 0;
                        for (r = d.length; b < r; b++)
                            if (9 === a.nodeType || h || A(d[b], e)) f[f.length] = d[b]
                    }));
                    return 1 < c.length && 1 < f.length ? h(f) : f
                },
                B = function(a) {
                    "undefined" !== typeof a.useNativeQSA && (E = a.useNativeQSA ? X ? Y : F : F)
                };
            B({
                useNativeQSA: !0
            });
            m.configure = B;
            m.uniq = h;
            m.is = function(a, e, f) {
                if (r(e)) return a == e;
                if (s(e)) return !!~b(e).indexOf(a);
                for (var h = e.split(","), d; e = h.pop();)
                    if (d = C.g(e) || C.s(e, e.split(I)), e = e.match(J), d = d.slice(0), t.apply(a, x(d.pop())) && (!d.length || c(a, d, e, f))) return !0;
                return !1
            };
            m.pseudos = {};
            return m
        });
        (function() {
            function l(c, b, h) {
                var d;
                x || (x = window[ensightenOptions.ns].qwery);
                d = x;
                if ((d = d.call(h, b, h)) && 0 < d.length) {
                    if ("_root" == b) c = h;
                    else if (c === h) c = void 0;
                    else {
                        b: {
                            for (var g = d.length, m = 0; m < g; m++)
                                if (c === d[m]) {
                                    d = !0;
                                    break b
                                }
                            d = !1
                        }
                        d || (c.parentNode ? (t++, c = l(c.parentNode, b, h)) : c = void 0)
                    }
                    return c
                }
                return !1
            }

            function u(c, b, d, g) {
                q[c.id] || (q[c.id] = {});
                q[c.id][b] || (q[c.id][b] = {});
                q[c.id][b][d] || (q[c.id][b][d] = []);
                q[c.id][b][d].push(g)
            }

            function k(c, b, d, g) {
                if (g || d)
                    if (g)
                        for (var k = 0; k < q[c.id][b][d].length; k++) {
                            if (q[c.id][b][d][k] ===
                                g) {
                                q[c.id][b][d].pop(k, 1);
                                break
                            }
                        } else delete q[c.id][b][d];
                    else q[c.id][b] = {}
            }

            function b(c, b, h) {
                if (q[c][h]) {
                    var g = b.target || b.srcElement,
                        k, m, n = {},
                        p = m = 0;
                    t = 0;
                    for (k in q[c][h]) q[c][h].hasOwnProperty(k) && (m = l(g, k, v[c].element)) && d.matchesEvent(h, v[c].element, m, "_root" == k, b) && (t++, q[c][h][k].match = m, n[t] = q[c][h][k]);
                    b.stopPropagation = function() {
                        b.cancelBubble = !0
                    };
                    for (m = 0; m <= t; m++)
                        if (n[m])
                            for (p = 0; p < n[m].length; p++) {
                                if (!1 === n[m][p].call(n[m].match, b)) {
                                    d.cancel(b);
                                    return
                                }
                                if (b.cancelBubble) return
                            }
                }
            }

            function g(c,
                g, h, l) {
                function p(c) {
                    return function(d) {
                        b(m, d, c)
                    }
                }
                c instanceof Array || (c = [c]);
                h || "function" != typeof g || (h = g, g = "_root");
                var m = this.id,
                    n;
                for (n = 0; n < c.length; n++) q[m] && q[m][c[n]] || d.addEvent(this, c[n], p(c[n])), l ? k(this, c[n], g, h) : u(this, c[n], g, h);
                return this
            }

            function d(b, g, h, k) {
                if ("string" == typeof b && "function" == typeof g || "string" == typeof g) d(document).on(b, g, h, k || !1);
                if (!(this instanceof d)) {
                    for (var l in v)
                        if (v[l].element === b) return v[l];
                    p++;
                    v[p] = new d(b, p);
                    v[p]._on = v[p].on;
                    v[p].on = function(b, c, d, g) {
                        var h =
                            "function" == typeof c ? c : d;
                        if ("function" == typeof c ? d : g) b = [b], "string" == typeof c && b.push(c), b.push(function(b) {
                            return function(c) {
                                c.defaultPrevented || window[ensightenOptions.ns].Delegate.load(this);
                                if (this.nodeName && "a" != this.nodeName.toLowerCase()) return b.call(this);
                                "undefined" != typeof c.preventDefault ? c.preventDefault() : c.returnValue = !1;
                                b.call(this)
                            }
                        }(h)), this._on.apply(this, b);
                        else return this._on.call(this, b, c, d)
                    };
                    return v[p]
                }
                this.element = b;
                this.id = g
            }
            var x, t = 0,
                p = 0,
                q = {},
                v = {};
            d.prototype.on = function(b,
                d, h) {
                return g.call(this, b, d, h)
            };
            d.prototype.off = function(b, d, h) {
                return g.call(this, b, d, h, !0)
            };
            d.cancel = function(b) {
                b.preventDefault();
                b.stopPropagation()
            };
            d.addEvent = function(b, d, g) {
                b.element.addEventListener(d, g, "blur" == d || "focus" == d)
            };
            d.matchesEvent = function() {
                return !0
            };
            d.load = function(b) {
                setTimeout(function(b, c) {
                    return function() {
                        if (b.nodeName && "a" == b.nodeName.toLowerCase()) {
                            if (c && /^javascript\s*\:/.test(c)) return (new Function(unescape(c))).call(window);
                            c && (window.location.href = c)
                        }
                    }
                }(b, b.href ||
                    ""), 750)
            };
            window[ensightenOptions.ns].Delegate = d
        })();
        (function(l) {
            var u = l.addEvent;
            l.addEvent = function(k, b, g) {
                if (k.element.addEventListener) return u(k, b, g);
                "focus" == b && (b = "focusin");
                "blur" == b && (b = "focusout");
                k.element.attachEvent("on" + b, g)
            };
            l.cancel = function(k) {
                k.preventDefault && k.preventDefault();
                k.stopPropagation && k.stopPropagation();
                k.returnValue = !1;
                k.cancelBubble = !0
            }
        })(window[ensightenOptions.ns].Delegate);
        window[ensightenOptions.ns].on = window[ensightenOptions.ns].Delegate;
        Bootstrapper.dataDefinitionIds = [];
        Bootstrapper.getServerComponent(Bootstrapper.getExtraParams ? Bootstrapper.getExtraParams() : undefined);
    }
})();