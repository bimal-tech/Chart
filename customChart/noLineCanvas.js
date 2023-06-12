function loadcanvas(canvas_id, canvas_width, atl, cp, ath) {
    var canvas = document.getElementById(canvas_id);
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
    var line_height = 10;
    ctx.font = "10pt Times New Roman";

    var line_type_1_params = [0.15, 0.67, 0.8];
    var line_type_2_params = [0.06, 0.8];
    var line_type_3_params = [0.15, 0.47, 0.67, 0.6, 0.65];

    // line1(ctx, 35, canvas_width, line_height, atl, cp, ath, line_type_1_params);
    line2(ctx, 60, canvas_width, line_height, atl, ath, cp);
    // line3(ctx, 85, canvas_width, line_height, atl, cp, ath, line_type_3_params);
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


    let atl_cp_line_difference = width * (0.97 - (atl.length - 1) / 100);
    ctx.moveTo(width - atl_cp_line_difference, height);
    ctx.lineTo(width - width / 1.7, height);
    ctx.stroke();
    let position = 0.42;
    ctx.fillText('$' + Number(cp).toFixed(2), width * position, (height + line_height * 0.25));
    ctx.beginPath();

    cp = Number(cp).toFixed(2);
    let cp_ath_line_difference = width * (0.49 - (cp.length - 6) / 100);


    ctx.moveTo(width - cp_ath_line_difference, height);
    ctx.lineTo(width - width * 0.21, height);
    ctx.stroke();
    ctx.fillText('$' + Number(ath).toFixed(2), (width * 0.8), (height + line_height * 0.25));

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