


let m = { isTest: false, cmd: 'LD' }
let a = false


var f = r(m, a)



function r(e, t) {
    return i(e, null, null, !1, t)
}

function i(e, r, _, i, s) {
    var o = null
    if (true && s && "LOGIN" != e.goformId && "SET_WEB_LANGUAGE" != e.goformId) {
        var a = hex_md5(rd0 + rd1)
            , u = Sr({
                nv: "RD"
            }).RD
            , c = hex_md5(a + u)
        e.AD = c
    }
    return e.isTest ? (o = simulate.simulateRequest(e, r, _, i, s),
        i ? void setTimeout(function () {
            r(o)
        }, getRandomInt(120) + 50) : o) : (ajax({
            type: s ? "POST" : "GET",
            url: s ? "/goform/goform_set_cmd_process" : e.cmd ? "/goform/goform_get_cmd_process" : "/goform/goform_set_cmd_process",
            data: e,
            dataType: "json",
            async: !!i,
            cache: !1,
            error: function (e) {
                i ? _(e) : 200 == e.status && (o = jQuery.parseJSON("(" + e.responseText + ")"))
            },
            success: function (e) {
                i ? r(e) : o = e
            }
        }),
            i ? void 0 : o)
}



function ajax(url, options) {

    // If url is an object, simulate pre-1.5 signature
    if (typeof url === "object") {
        options = url
        url = undefined
    }

    // Force options to be an object
    options = options || {}

    // Define a local copy of jQuery
    var jQuery = function (selector, context) {
        // The jQuery object is actually just the init constructor 'enhanced'
        return new jQuery.fn.init(selector, context, rootjQuery)
    }


    var // Create the final options object
        s = jQuery.ajaxSetup({}, options),
        // Callbacks context
        callbackContext = s.context || s,
        // Context for global events
        // It's the callbackContext if one was provided in the options
        // and if it's a DOM node or a jQuery collection
        globalEventContext = callbackContext !== s &&
            (callbackContext.nodeType || callbackContext instanceof jQuery) ?
            jQuery(callbackContext) : jQuery.event,
        // Deferreds
        deferred = jQuery.Deferred(),
        completeDeferred = jQuery.Callbacks("once memory"),
        // Status-dependent callbacks
        statusCode = s.statusCode || {},
        // ifModified key
        ifModifiedKey,
        // Headers (they are sent all at once)
        requestHeaders = {},
        requestHeadersNames = {},
        // Response headers
        responseHeadersString,
        responseHeaders,
        // transport
        transport,
        // timeout handle
        timeoutTimer,
        // Cross-domain detection vars
        parts,
        // The jqXHR state
        state = 0,
        // To know if global events are to be dispatched
        fireGlobals,
        // Loop variable
        i,
        // Fake xhr
        jqXHR = {

            readyState: 0,

            // Caches the header
            setRequestHeader: function (name, value) {
                if (!state) {
                    var lname = name.toLowerCase()
                    name = requestHeadersNames[lname] = requestHeadersNames[lname] || name
                    requestHeaders[name] = value
                }
                return this
            },

            // Raw string
            getAllResponseHeaders: function () {
                return state === 2 ? responseHeadersString : null
            },

            // Builds headers hashtable if needed
            getResponseHeader: function (key) {
                var match
                if (state === 2) {
                    if (!responseHeaders) {
                        responseHeaders = {}
                        while ((match = rheaders.exec(responseHeadersString))) {
                            responseHeaders[match[1].toLowerCase()] = match[2]
                        }
                    }
                    match = responseHeaders[key.toLowerCase()]
                }
                return match === undefined ? null : match
            },

            // Overrides response content-type header
            overrideMimeType: function (type) {
                if (!state) {
                    s.mimeType = type
                }
                return this
            },

            // Cancel the request
            abort: function (statusText) {
                statusText = statusText || "abort"
                if (transport) {
                    transport.abort(statusText)
                }
                done(0, statusText)
                return this
            }
        }

    // Callback for when everything is done
    // It is defined here because jslint complains if it is declared
    // at the end of the function (which would be more logical and readable)
    function done(status, nativeStatusText, responses, headers) {

        // Called once
        if (state === 2) {
            return
        }

        // State is "done" now
        state = 2

        // Clear timeout if it exists
        if (timeoutTimer) {
            clearTimeout(timeoutTimer)
        }

        // Dereference transport for early garbage collection
        // (no matter how long the jqXHR object will be used)
        transport = undefined

        // Cache response headers
        responseHeadersString = headers || ""

        // Set readyState
        jqXHR.readyState = status > 0 ? 4 : 0

        var isSuccess,
            success,
            error,
            statusText = nativeStatusText,
            response = responses ? ajaxHandleResponses(s, jqXHR, responses) : undefined,
            lastModified,
            etag

        // If successful, handle type chaining
        if (status >= 200 && status < 300 || status === 304) {

            // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
            if (s.ifModified) {

                if ((lastModified = jqXHR.getResponseHeader("Last-Modified"))) {
                    jQuery.lastModified[ifModifiedKey] = lastModified
                }
                if ((etag = jqXHR.getResponseHeader("Etag"))) {
                    jQuery.etag[ifModifiedKey] = etag
                }
            }

            // If not modified
            if (status === 304) {

                statusText = "notmodified"
                isSuccess = true

                // If we have data
            } else {

                try {
                    success = ajaxConvert(s, response)
                    statusText = "success"
                    isSuccess = true
                } catch (e) {
                    // We have a parsererror
                    statusText = "parsererror"
                    error = e
                }
            }
        } else {
            // We extract error from statusText
            // then normalize statusText and status for non-aborts
            error = statusText
            if (!statusText || status) {
                statusText = "error"
                if (status < 0) {
                    status = 0
                }
            }
        }

        // Set data for the fake xhr object
        jqXHR.status = status
        jqXHR.statusText = "" + (nativeStatusText || statusText)

        // Success/Error
        if (isSuccess) {
            deferred.resolveWith(callbackContext, [success, statusText, jqXHR])
        } else {
            deferred.rejectWith(callbackContext, [jqXHR, statusText, error])
        }

        // Status-dependent callbacks
        jqXHR.statusCode(statusCode)
        statusCode = undefined

        if (fireGlobals) {
            globalEventContext.trigger("ajax" + (isSuccess ? "Success" : "Error"),
                [jqXHR, s, isSuccess ? success : error])
        }

        // Complete
        completeDeferred.fireWith(callbackContext, [jqXHR, statusText])

        if (fireGlobals) {
            globalEventContext.trigger("ajaxComplete", [jqXHR, s])
            // Handle the global AJAX counter
            if (!(--jQuery.active)) {
                jQuery.event.trigger("ajaxStop")
            }
        }
    }

    // Attach deferreds
    deferred.promise(jqXHR)
    jqXHR.success = jqXHR.done
    jqXHR.error = jqXHR.fail
    jqXHR.complete = completeDeferred.add

    // Status-dependent callbacks
    jqXHR.statusCode = function (map) {
        if (map) {
            var tmp
            if (state < 2) {
                for (tmp in map) {
                    statusCode[tmp] = [statusCode[tmp], map[tmp]]
                }
            } else {
                tmp = map[jqXHR.status]
                jqXHR.then(tmp, tmp)
            }
        }
        return this
    }

    // Remove hash character (#7531: and string promotion)
    // Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
    // We also use the url parameter if available
    s.url = ((url || s.url) + "").replace(rhash, "").replace(rprotocol, ajaxLocParts[1] + "//")

    // Extract dataTypes list
    s.dataTypes = jQuery.trim(s.dataType || "*").toLowerCase().split(rspacesAjax)

    // Determine if a cross-domain request is in order
    if (s.crossDomain == null) {
        parts = rurl.exec(s.url.toLowerCase())
        s.crossDomain = !!(parts &&
            (parts[1] != ajaxLocParts[1] || parts[2] != ajaxLocParts[2] ||
                (parts[3] || (parts[1] === "http:" ? 80 : 443)) !=
                (ajaxLocParts[3] || (ajaxLocParts[1] === "http:" ? 80 : 443)))
        )
    }

    // Convert data if not already a string
    if (s.data && s.processData && typeof s.data !== "string") {
        s.data = jQuery.param(s.data, s.traditional)
    }

    // Apply prefilters
    inspectPrefiltersOrTransports(prefilters, s, options, jqXHR)

    // If request was aborted inside a prefilter, stop there
    if (state === 2) {
        return false
    }

    // We can fire global events as of now if asked to
    fireGlobals = s.global

    // Uppercase the type
    s.type = s.type.toUpperCase()

    // Determine if request has content
    s.hasContent = !rnoContent.test(s.type)

    // Watch for a new set of requests
    if (fireGlobals && jQuery.active++ === 0) {
        jQuery.event.trigger("ajaxStart")
    }

    // More options handling for requests with no content
    if (!s.hasContent) {

        // If data is available, append data to url
        if (s.data) {
            s.url += (rquery.test(s.url) ? "&" : "?") + s.data
            // #9682: remove data so that it's not used in an eventual retry
            delete s.data
        }

        // Get ifModifiedKey before adding the anti-cache parameter
        ifModifiedKey = s.url

        // Add anti-cache in url if needed
        if (s.cache === false) {

            var ts = jQuery.now(),
                // try replacing _= if it is there
                ret = s.url.replace(rts, "$1_=" + ts)

            // if nothing was replaced, add timestamp to the end
            s.url = ret + ((ret === s.url) ? (rquery.test(s.url) ? "&" : "?") + "_=" + ts : "")
        }
    }

    // Set the correct header, if data is being sent
    if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
        jqXHR.setRequestHeader("Content-Type", s.contentType)
    }

    // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
    if (s.ifModified) {
        ifModifiedKey = ifModifiedKey || s.url
        if (jQuery.lastModified[ifModifiedKey]) {
            jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[ifModifiedKey])
        }
        if (jQuery.etag[ifModifiedKey]) {
            jqXHR.setRequestHeader("If-None-Match", jQuery.etag[ifModifiedKey])
        }
    }

    // Set the Accepts header for the server, depending on the dataType
    jqXHR.setRequestHeader(
        "Accept",
        s.dataTypes[0] && s.accepts[s.dataTypes[0]] ?
            s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") :
            s.accepts["*"]
    )

    // Check for headers option
    for (i in s.headers) {
        jqXHR.setRequestHeader(i, s.headers[i])
    }

    // Allow custom headers/mimetypes and early abort
    if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || state === 2)) {
        // Abort if not done already
        jqXHR.abort()
        return false

    }

    // Install callbacks on deferreds
    for (i in { success: 1, error: 1, complete: 1 }) {
        jqXHR[i](s[i])
    }

    // Get transport
    transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR)

    // If no transport, we auto-abort
    if (!transport) {
        done(-1, "No Transport")
    } else {
        jqXHR.readyState = 1
        // Send global event
        if (fireGlobals) {
            globalEventContext.trigger("ajaxSend", [jqXHR, s])
        }
        // Timeout
        if (s.async && s.timeout > 0) {
            timeoutTimer = setTimeout(function () {
                jqXHR.abort("timeout")
            }, s.timeout)
        }

        try {
            state = 1
            transport.send(requestHeaders, done)
        } catch (e) {
            // Propagate exception as error if not done
            if (state < 2) {
                done(-1, e)
                // Simply rethrow otherwise
            } else {
                throw e
            }
        }
    }

    return jqXHR
}



console.log(f)