//these functions re-adjust the circles when the map is moved, zoomed, or the window is resized

function projection_transform(d) {
	d = projection.fromLatLngToDivPixel(d.lat_lng);
	return d3.select(this)
	  .attr('cx',d.x-sw.x)
	  .attr('cy',d.y-ne.y);
}

/* data circles */

//updates the size of the data circle radii based on a passed variable
function changeradius(option) {
	if(typeof data_circle_options.radius != "undefined") { //if a hard radius is set, just change it to that
        svg.selectAll("."+data_circle_options.circle_class)
            .attr("r", data_circle_options.radius);
		return;
	}
    if(option) {
        data_circle_options.selector_selected = option;
    }

    var radfunc = function(d) {
        if(typeof data_circle_options.selector_options[data_circle_options.selector_selected][1]=="function") {
            return Math.max(data_circle_options.selector_options[data_circle_options.selector_selected][1](d)+data_circle_options.radius_add,data_circle_options.radius_min);
        } else {
            return Math.max(data_circle_options.selector_options[data_circle_options.selector_selected][1]+data_circle_options.radius_add,data_circle_options.radius_min);
        }
    }
    if(option) {
        svg.selectAll("."+data_circle_options.circle_class) //for each of the circles...
            .transition()	//adding this means it will make the radius change in a smooth way
            .attr("r", radfunc);
    } else { //does it without transition on first go, otherwise can cause problems
        svg.selectAll("."+data_circle_options.circle_class) //for each of the circles...
            .attr("r", radfunc);
    }

	if(data_circle_options.autosort) {
		//sorts so that smallest radius always on top
		svg.selectAll("."+data_circle_options.circle_class) //for each of the circles...
            .sort(function (a,b) { //resort so bigger circles on bottom
                return radfunc(b) - radfunc(a);
            })
		;
	}

}

//updates color of circle based on passed variable
function changecolor(field) {
    if(field) {
        data_circle_options.color_field = field;
        if(typeof data_circle_options.fill_color == "function") {
            svg.selectAll("."+data_circle_options.circle_class)
                .transition()
                .style("fill", function(d) { return data_circle_options.fill_color(d); });
        } else {
            svg.selectAll("."+data_circle_options.circle_class)
                .transition()
                .style("fill", data_circle_options.fill_color);
        }
    } else {
        if(typeof data_circle_options.fill_color == "function") {
            svg.selectAll("."+data_circle_options.circle_class)
                .style("fill", function(d) { return data_circle_options.fill_color(d); });
        } else {
            svg.selectAll("."+data_circle_options.circle_class)
                .style("fill", data_circle_options.fill_color);
        }
    }
    if(typeof data_circle_options.color_legend == "function") {
        data_circle_options.color_legend();
    }
}

/* text filter */

//    this function will filter the data with a given class. "selector_index" refers to the index of the selector_options array,
//    which is also the index of the SELECT tag created by the init function.
function textFilter(selector_index) {
    var fopt = text_filter_options, text_filter_options_two; //gets the options variable
    d3.selectAll("."+fopt.filter_class) //select all the data by the class given
        .attr("class", function(d) { //now we set its class...
            var val = fopt.selector_options[selector_index][1]; //value to search for
            if(val===0) { //if the value is equal to zero
                return fopt.filter_class; //just set the class to default ("all")
            }
            var t = d[fopt.filter_field];
            if(typeof fopt.before_comparing == "function") t = fopt.before_comparing(t); //run the "before_comparing" function on the text if we need to
            if(typeof val == "function") { //if the value is a function
                if(val(t)) {
                    return fopt.filter_class+" "+fopt.text_found_class; //text is found
                } else {
                    return fopt.filter_class+" "+fopt.text_lacks_class; //text is found
                }
            } else { //otherwise, search it ourselves
                if(t.indexOf(val)>-1) { //indexOf gives the first instance of a piece of text in another piece of text, with -1 being returned if it isn't there
                    return fopt.filter_class+" "+fopt.text_found_class; //text is found
                } else {
                    return fopt.filter_class+" "+fopt.text_lacks_class; //text is not found
                }
            }
        })
}


//this is just a generic custom sorting function whose only thing going for it is that it can distinguish alphabetic vs. numeric sorting
function sort_it(a,b) {
    if(isNaN(a)) {
        if(a < b) return -1;
        if(a > b) return 1;
        return 0;
    } else {
        return a - b;
    }
}