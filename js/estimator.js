/******************************************************************************************************/
$(document).ready(function(){

    // Estimator input data received
    const inputData = {
        region: {
        name: "Africa",
        avgAge: 19.7,
        avgDailyIncomeInUSD: 5,
        avgDailyIncomePopulation: 0.71
        },
        periodType: "days",
        timeToElapse: 58,
        reportedCases: 674,
        population: 66622705,
        totalHospitalBeds: 1380614
    };

    $(document).on('submit', "#est_form", function(e){
        e.preventDefault();
        let outputD = '';

        const formValidation = /[^0-9]/;

        let populationEstimator = '';
        let timeToElapseEstimator = '';
        let periodTypeEstimator = ''; 
        let totalHospitalBedsEstimator = ''; 
        let reportedCasesEstimator = ''; 

        let errorPopulationEstimator = '';
        let errorTimeToElapseEstimator = '';
        let errorPeriodTypeEstimator = '';
        let errorTotalHospitalBedsEstimator = '';
        let errorReportedCasesEstimator = '';

        if($('#population').val() == '' || $("#population").val().match(formValidation)){
            errorPopulationEstimator = 'Population is required (Numbers only)';
            $('#errorPopulationEstimator').text(errorPopulationEstimator);
            $('#population').css('border-color', '#cc0000');
            populationEstimator = '';
        }
        else{
            errorPopulationEstimator = '';
            $('#errorPopulationEstimator').text(errorPopulationEstimator);
            $('#population').css('border-color', '');
            populationEstimator = $('#population').val();
        }

        if($('#timeToElapse').val() == '' || $("#timeToElapse").val().match(formValidation)){
            errorTimeToElapseEstimator = 'Time to elapse is required (Numbers only)';
            $('#errorTimeToElapseEstimator').text(errorTimeToElapseEstimator);
            $('#timeToElapse').css('border-color', '#cc0000');
            timeToElapseEstimator = '';
        }
        else{
            errorTimeToElapseEstimator = '';
            $('#errorTimeToElapseEstimator').text(errorTimeToElapseEstimator);
            $('#timeToElapse').css('border-color', '');
            timeToElapseEstimator = $('#timeToElapse').val();
        }

        if($('#totalHospitalBeds').val() == '' || $("#totalHospitalBeds").val().match(formValidation)){
            errorTotalHospitalBedsEstimator = 'No of Hospital beds is required (Numbers only)';
            $('#errorTotalHospitalBedsEstimator').text(errorTotalHospitalBedsEstimator);
            $('#totalHospitalBeds').css('border-color', '#cc0000');
            totalHospitalBedsEstimator = '';
        }
        else{
            errorTotalHospitalBedsEstimator = '';
            $('#errorTotalHospitalBedsEstimator').text(errorTotalHospitalBedsEstimator);
            $('#totalHospitalBeds').css('border-color', '');
            totalHospitalBedsEstimator = $('#totalHospitalBeds').val();
        }

        if($('#reportedCases').val() == '' || $("#reportedCases").val().match(formValidation)){
            errorReportedCasesEstimator = 'No of reported cases is required (Numbers only)';
            $('#errorReportedCasesEstimator').text(errorReportedCasesEstimator);
            $('#reportedCases').css('border-color', '#cc0000');
            reportedCasesEstimator = '';
        }
        else{
            errorReportedCasesEstimator = '';
            $('#errorReportedCasesEstimator').text(errorReportedCasesEstimator);
            $('#reportedCases').css('border-color', '');
            reportedCasesEstimator = $('#reportedCases').val();
        }
        if($('#periodType option:selected').index() === 0){
            errorPeriodTypeEstimator = 'Period type selection is required';
            $('#errorPeriodTypeEstimator').text(errorPeriodTypeEstimator);
            $('#periodType').css('border-color', '#cc0000');
            periodTypeEstimator = '';
        }
        else{
            errorPeriodTypeEstimator = '';
            $('#errorPeriodTypeEstimator').text(errorPeriodTypeEstimator);
            $('#periodType').css('border-color', '');
            periodTypeEstimator = $('#periodType').val();
        }  

        if(errorPopulationEstimator !== '' || errorTimeToElapseEstimator !== '' || errorPeriodTypeEstimator !== '' || errorTotalHospitalBedsEstimator !== '' || errorReportedCasesEstimator !== '')
        {
            return false;
        }

        inputData.population = +populationEstimator;
        inputData.timeToElapse = +timeToElapseEstimator;
        inputData.reportedCases = +reportedCasesEstimator;
        inputData.totalHospitalBeds = +totalHospitalBedsEstimator;
        inputData.periodType = periodTypeEstimator;

        //output result
        const outputData = {
            data: inputData,           // the input data you got
            impact: {},         // your best case estimation
            severeImpact: {}    // your severe case estimation
        };

        /**
        * CHALLENGES
        */
        //function to store currentlyInfected
        const covid19ImpactEstimator = (data) => data;

        //variable declaration to hold the result of covid19ImpactEstimator function call
        const currentlyInfected = covid19ImpactEstimator(inputData.reportedCases);
        const totalHospitalBeds = inputData.totalHospitalBeds;
        //const impactPercent = Math.floor((35/100) * totalHospitalBeds);

        const challengeEstimator = (currentlyInfected, totalHospitalBeds) => {
            return (
                //property currentlyInfected added to the impact object
                outputData.impact["currentlyInfected"] = currentlyInfected * 10,
                //property currentlyInfected added to the severeImpact object
                outputData.severeImpact["currentlyInfected"] = currentlyInfected * 50,

                //property infectionsByRequestedTime, added to the impact object
                outputData.impact["infectionsByRequestedTime"] = outputData.impact.currentlyInfected * Math.pow(2, 9),

                //property infectionsByRequestedTime, added to the severeImpact object
                outputData.severeImpact["infectionsByRequestedTime"] = outputData.severeImpact.currentlyInfected * Math.pow(2, 9),

                //property severeCasesByRequestedTime, added to the impact object
                outputData.impact["severeCasesByRequestedTime"] = (15/100) * outputData.impact.infectionsByRequestedTime,

                //property severeCasesByRequestedTime, added to the severeImpact object
                outputData.severeImpact["severeCasesByRequestedTime"] = (15/100) * outputData.severeImpact.infectionsByRequestedTime,

                //property hospitalBedsByRequestedTime, added to the impact object
                outputData.impact["hospitalBedsByRequestedTime"] = Math.floor((35/100) * totalHospitalBeds),

                //property hospitalBedsByRequestedTime, added to the severeImpact object
                outputData.severeImpact["hospitalBedsByRequestedTime"] = Math.floor((35/100) * totalHospitalBeds),

                //property casesForICUByRequestedTime, added to the impact object
                outputData.impact["casesForICUByRequestedTime"] = Math.floor((5/100) * outputData.impact.infectionsByRequestedTime),

                //property casesForICUByRequestedTime, added to the severeImpact object
                outputData.severeImpact["casesForICUByRequestedTime"] = Math.floor((5/100) * outputData.severeImpact.infectionsByRequestedTime),

                //property casesForVentilatorsByRequestedTime, added to the impact object
                outputData.impact["casesForVentilatorsByRequestedTime"] = Math.floor((2/100) * outputData.impact.infectionsByRequestedTime),

                //property casesForVentilatorsByRequestedTime, added to the severeImpact object
                outputData.severeImpact["casesForVentilatorsByRequestedTime"] = Math.floor((2/100) * outputData.severeImpact.infectionsByRequestedTime),

                //property dollarsInFlight, added to the impact object
                outputData.impact["dollarsInFlight"] = Math.floor((outputData.impact.infectionsByRequestedTime * 0.65 * 1.5)/30),

                //property dollarsInFlight, added to the severeImpact object
                outputData.severeImpact["dollarsInFlight"] = Math.floor((outputData.severeImpact.infectionsByRequestedTime * 0.65 * 1.5)/30)
            );
        };

        challengeEstimator(currentlyInfected, inputData.totalHospitalBeds);

        outputD += '<table class="table table-bordered" width="100%">';

        outputD += '<tr><th colspan="2">Given Data</th></tr>';

        outputD += '<tr><th width="70%">Data Name</th><th>Data Value</th></tr>';

        outputD += '<tr><th width="70%">Population</th><td>66622705</td></tr>';

        outputD += '<tr><th width="70%">Reported Cases</th><td>674</td></tr>';

        outputD += '<tr><th width="70%">Time to Elapse</th><td>58</td></tr>';

        outputD += '<tr><th width="70%">Total Hospital Beds</th><td>1380614</td></tr>';

        outputD += '<tr><th width="70%">Period Type</th><td>days</td></tr></table><br/>';

        outputD += '<table class="table table-bordered" width="100%" style="background-color: #050E6C; color:white;">';
                    
        outputD += '<tr><th colspan="6">Output Result</th></tr>';

        outputD += '<tr><th colspan="2">Impact</th><th colspan="2">Severe Impact</th><th colspan="2">Data</th></tr>';

        outputD += '<tr><th>Currently Infected</th><th>'+outputData.impact.currentlyInfected+'</th><th>Currently Infected</th><th>'+outputData.severeImpact.currentlyInfected+'</th><th>Population</th><th>'+inputData.population+'</th></tr>';

        outputD += '<tr><th>Infections By Requested Time</th><th>'+outputData.impact.infectionsByRequestedTime+'</th><th>Infections By Requested Time</th><th>'+outputData.severeImpact.infectionsByRequestedTime+'</th><th>Reported Cases</th><th>'+inputData.reportedCases+'</th></tr>';
                        
        outputD += '<tr><th>Severe Cases By Requested Time</th><th>'+outputData.impact.severeCasesByRequestedTime+'</th><th>Severe Cases By Requested Time</th><th>'+outputData.severeImpact.severeCasesByRequestedTime+'</th><th>Time To Elapse</th><th>'+inputData.timeToElapse+'</th></tr>';

        outputD += '<tr><th>Hospital Beds By Requested Time</th><th>'+outputData.impact.hospitalBedsByRequestedTime+'</th><th>Hospital Beds By Requested Time</th><th>'+outputData.severeImpact.hospitalBedsByRequestedTime+'</th><th>Total Hospital Beds</th><th>'+inputData.totalHospitalBeds+'</th></tr>';

        outputD += '<tr><th>Cases For ICU By Requested Time</th><th>'+outputData.impact.casesForICUByRequestedTime+'</th><th>Cases For ICU By Requested Time</th><th>'+outputData.severeImpact.casesForICUByRequestedTime+'</th><th>Period Type</th><th>'+inputData.periodType+'</th></tr>';

        outputD += '<tr><th>Cases For Ventilators By Requested Time</th><th>'+outputData.impact.casesForVentilatorsByRequestedTime+'</th><th>Cases For Ventilators By Requested Time</th><th>'+outputData.severeImpact.casesForVentilatorsByRequestedTime+'</th><th></th><th></th></tr>';

        outputD += '<tr><th>Dollars In Flight</th><th>'+outputData.impact.dollarsInFlight+'</th><th>Dollars In Flight</th><th>'+outputData.severeImpact.dollarsInFlight+'</th><th></th><th></th></tr></table>';

        $('#tbl').empty();
        $('#tbl').append(outputD);

        $('#est_form')[0].reset();
    });


});