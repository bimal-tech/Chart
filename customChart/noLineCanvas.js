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
    let atl_cp_line_difference = width * (0.94 - (atl.toString().length - 1) / 100);
    ctx.moveTo(width - atl_cp_line_difference, height);
    ctx.lineTo(width - width / 1.7, height);
    ctx.stroke();
    let position = 0.42;
    ctx.fillText('$' + Number(cp).toFixed(2), width * position, (height + line_height * 0.25));
    ctx.beginPath();

    cp = Number(cp).toFixed(2);
    let cp_ath_line_difference_starting = width * (0.47 - (cp.toString().length - 3) / 100);
    ctx.moveTo(width - cp_ath_line_difference_starting, height);

    ath = Number(ath).toFixed(2);
    let cp_ath_line_difference_ending = width * (0.16 + (ath.toString().length - 4) / 100);
    ctx.lineTo(width - cp_ath_line_difference_ending, height);
    ctx.stroke();
    ctx.fillText('$' + ath, (width - cp_ath_line_difference_ending + 4), (height + line_height * 0.25));

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
    ctx.arc(diff_for_circle(atl, cp, ath) * width, (height + line_height * 0.0), 4, 0, 2 * Math.PI);
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
    // ath = Number(ath).toFixed(2);

    // if (cp == 0 || cp == atl) {
    //     return 0.08;
    // }
    // if (cp == ath || ath - cp < 1) {
    //     let cp_ath_line_difference_ending = (0.16 + (ath.toString().length - 4) / 100);
    //     return 1 - cp_ath_line_difference_ending - 0.01;
    // }

    if (cp == 0) {
        return 1.02 - (0.94 - (atl.toString().length - 1) / 100);
    }
    let diff = (ath - atl - cp + atl) / (ath - atl);
    if (diff > 0.8) {
        return 1 - (0.16 + (ath.toString().length - 2) / 100);
    }
    if (diff < 0.2) {
        return (0.94 - (atl.toString().length - 1) / 100);
    }
    return diff;
}