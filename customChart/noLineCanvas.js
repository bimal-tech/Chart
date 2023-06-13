function loadcanvas(canvas_id, canvas_width, atl, cp, ath) {
    var canvas = document.getElementById(canvas_id);
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
    var line_height = 10;
    ctx.font = "10pt Times New Roman";

    var line_type_1_params = [0.22, 0.65, 0.8];
    var line_type_3_params = [0.22, 0.47, 0.64, 0.6, 0.65];

    line1(ctx, 35, canvas_width, line_height, atl, cp, ath, line_type_1_params);
    line2(ctx, 60, canvas_width, line_height, atl, ath, cp);
    line3(ctx, 85, canvas_width, line_height, atl, cp, ath, line_type_3_params);
    current_price_circle(ctx, 60, canvas_width, line_height, atl, cp, ath);
}

function line1(ctx, height, width, line_height, atl, cp, ath, line_params) {
    ctx.fillStyle = "green";
    ctx.fillText(diff_atl_cp(atl, cp), (width * line_params[0]), (height + line_height + 7));

    ctx.fillText(diff_cp_ath(cp, ath), (width * line_params[1]), (height + line_height + 7));

    ctx.fillText(diff_atl_ath(atl, ath), (width * line_params[2]), (height + line_height * 0.8));
}

function line2(ctx, height, width, line_height, atl, ath, cp) {
    ctx.font = 'bold 11pt Times New Roman';
    ctx.fillStyle = "black";
    ctx.fillText('$' + atl, 0, (height + line_height * 0.25));
    ctx.setLineDash([5, 0]);
    ctx.beginPath();
    let atl_cp_line_difference = getline1starting(atl, width);
    ctx.moveTo(atl_cp_line_difference, height);
    ctx.lineTo(getline1ending(width), height);
    ctx.stroke();
    let position = 0.42;
    ctx.fillText('$' + Number(cp).toFixed(2), width * position, (height + line_height * 0.25));
    ctx.beginPath();

    cp = Number(cp).toFixed(2);
    let cp_ath_line_difference_starting = getline2starting(cp, width);

    ctx.moveTo(cp_ath_line_difference_starting, height);

    ath = Number(ath).toFixed(2);
    let cp_ath_line_difference_ending = getline2ending(ath, width);
    ctx.lineTo(cp_ath_line_difference_ending, height);
    ctx.stroke();
    ctx.fillText('$' + ath, (cp_ath_line_difference_ending + 4), (height + line_height * 0.25));

}

function getline1starting(atl, width) {
    return width * (1 - (0.94 - (atl.toString().length - 1) / 100));
}

function getline1ending(width) {
    return width - width / 1.7;
}

function getline2starting(cp, width) {
    let cp_ath_line_difference_starting = 0;
    switch (cp.toString().length) {
        case 4:
            cp_ath_line_difference_starting = width * (1 - 0.49);
            break;
        case 5:
            cp_ath_line_difference_starting = width * (1 - 0.47);
            break;
        case 6:
            cp_ath_line_difference_starting = width * (1 - 0.45);
            break;
        case 7:
            cp_ath_line_difference_starting = width * (1 - 0.43);
            break;
        case 8:
            cp_ath_line_difference_starting = width * (1 - 0.41);
            break;
        default:
            cp_ath_line_difference_starting = width * (1 - (0.40 - (cp.toString().length - 8) / 100));
            break;
    }
    return cp_ath_line_difference_starting;
}


function getline2ending(ath, width) {
    return width * (1 - (0.16 + (ath.toString().length - 4) / 100));
}

function line3(ctx, height, width, line_height, atl, cp, ath, line_params) {
    ctx.fillStyle = "red";
    ctx.font = "10pt Times New Roman";
    ctx.fillText(diff_ath_atl(atl, ath), 0, (height - line_height * 0.4));

    ctx.fillText(diff_cp_atl(atl, cp), width * line_params[0], height - 7);

    // ctx.font = 'bold 11pt Times New Roman';
    // ctx.fillText('$' + Number(cp).toFixed(2), width * line_params[1], (height + line_height * 0.25));

    ctx.fillText(diff_ath_cp(cp, ath), (width * line_params[2]), height - 7);
}

function current_price_circle(ctx, height, width, line_height, atl, cp, ath) {
    ctx.beginPath();
    let line1_start = getline1starting(atl, width);
    let line1_end = getline1ending(width);
    let line2_start = getline2starting(cp, width);
    let line2_end = getline2ending(ath, width);
    let percentage_position = diff_for_circle(atl, cp, ath);
    let x_position = (percentage_position * (line2_end - line1_start)) + line1_start;
    let x = x_position;
    if (x_position > line1_end && x_position < line2_start) {
        if ((x_position - line1_end) > (line2_start - x_position)) {
            x = line2_start + 16;
        } else {
            x = line1_end - 4;
        }
    }
    if (percentage_position == 1) {
        x = line2_end - 16;
    }


    ctx.arc(x, (height + line_height * 0.03), 4, 0, 2 * Math.PI);
    ctx.fillStyle = 'black';
    ctx.stroke();
    ctx.fill();
}

function diff_atl_ath(atl, ath) {
    var perc = 0;
    if (atl > 0) {
        var perc = ath / atl * 100;

    }
    return perc.toFixed(1) + '%';
}

function diff_atl_cp(atl, cp) {
    var perc = 0;
    if (atl > 0) {

        var perc = cp / atl * 100;
    }
    return perc.toFixed(1) + '%';
}

function diff_cp_ath(cp, ath) {
    var perc = 0;
    if (cp > 0) {

        var perc = ath / cp * 100;
    }
    return perc.toFixed(1) + '%';
}

function diff_cp_atl(atl, cp) {
    var perc = 0;
    if (cp > 0) {
        var perc = (atl - cp) / cp * 100;

    }
    return perc.toFixed(1) + '%';
}

function diff_ath_cp(cp, ath) {
    var perc = 0;
    if (ath > 0) {

        var perc = (cp - ath) / ath * 100;
    }
    return perc.toFixed(1) + '%';
}

function diff_ath_atl(atl, ath) {
    var perc = 0;
    if (ath > 0) {
        var perc = (atl - ath) / ath * 100;
    }
    return perc.toFixed(1) + '%';
}

function diff_atl_ath_cp(atl, cp, ath) {

    let diff = (ath - atl) / 2;
    return cp > diff ? 1 : 0;
}

function diff_for_circle(atl, cp, ath) {
    let diff = cp / ath;;
    return diff;
}