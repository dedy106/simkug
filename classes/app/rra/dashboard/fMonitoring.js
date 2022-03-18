/**
 * @author dweexfuad
 */
//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
//"<img width=18 height=18 src='image/ok.png' />." :"<img width=18 height=18 src='image/error.png' />." )
window.app_rra_dashboard_fMonitoring = function(owner,options){
	try{
		if (owner)
		{
			window.app_rra_dashboard_fMonitoring.prototype.parent.constructor.call(this, owner,options);
			this.className = "app_rra_dashboard_fMonitoring";
			this.maximize();
			this.app._mainForm.childFormConfig(this, "mainButtonClick","Monitoring ",99);
			this.setTop(55);
			this.setHeight(this.height + 40);            
            this.onClose.set(this,"doClose");						
            this.initComponent();
		}
	}catch(e)
	{
		alert("[app_rra_dashboard_fMonitoring]::contruct:"+e,"");
	}
};
window.app_rra_dashboard_fMonitoring.extend(window.childForm);
window.app_rra_dashboard_fMonitoring.implement({
	doAfterResize: function(width, height){
	   this.setTop(55);	   
	 //  this.setHeight(height + 40);
	   
    },
    doClose: function(sender){
        this.app._mainForm.pButton.show();
        this.dbLib.delListener(this);
    },
    initComponent: function(){
		try{
			uses("util_standar;button;saiGrid;sgNavigator;toolbar;pageControl;roundPanel;datePicker;radioButton;util_filterRep");						
			this.standarLib = new util_standar();
			this.dbLib = this.app.dbLib;
			this.dbLib.addListener(this);			
			
			this.p1mp = new pageControl(this,{bound:[10,5,this.width - 25,this.height - 100],
				childPage:["Daftar PDRK","PDRK","Review UBIS","Review Grup UBIS","Review MA","Review FC","SUKKA", "Tracking PDRK"]});
			
			this.toolbar = new toolbar(this,{bound:[this.width - 170,5,150,25],buttonClick:[this,"doToolBarClick"]});
			this.toolbar.addButton("bFilter","Filter","icon/dynpro/filter2.png","Filter");
			this.toolbar.addButton("bOptions","Options","icon/dynpro/filter2.png","");
			this.toolbar.makeRound(5);			
			
			this.sg1mp = new saiGrid(this.p1mp.childPage[0], {
				bound: [1, 0, this.p1mp.width - 4, this.p1mp.height - 30],
				colCount: 26,
				colTitle: ["REV.UBIS","APP.AGG.","APP.PNJ.PROG","FINOP","REV.GUBIS","APP.GUBIS","REV.MA","APP.MA","REV.KEEP","KEEP SAP","REVIEW FC","APP FC","SUKKA","REV.SUKKA","APP.SUKKA","PROC SAP","No PDRK","UBIS","Tanggal","Keterangan","Nilai Usulan","No Nota Dinas","File Nota Dinas","Jenis","Modul","Sub Modul"],
				//colWidth: [[17,16,15,14,13,12,11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0], [100,100,150,150,100,100,100,250,100,100,100,100,100,100,100,100,100,100,100]],
				dblClick: [this, "sg1onDblClick"],				
				colFormat: [[20], [cfNilai]],
				colAlign: [[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], [alCenter, alCenter, alCenter, alCenter,alCenter, alCenter, alCenter, alCenter, alCenter, alCenter,alCenter, alCenter, alCenter, alCenter, alCenter, alCenter]],
				readOnly: true
			});
            this.sgn = new sgNavigator(this.p1mp.childPage[0], {
				bound: [1, this.sg1mp.height + 2, this.p1mp.width - 4, 25],
				buttonStyle: 3,
				pager: [this, "doPager"],
				grid: this.sg1mp
			});
			this.viewer = new reportViewer(this.p1mp.childPage[1],{bound:[0,0,this.p1mp.width - 3, this.p1mp.height - 25]});
			
			var page2 = this.p1mp.childPage[2];
			page2.no_rev = new saiLabelEdit(this.p1mp.childPage[2],{bound:[10,1,200,20], caption:"No Review", readOnly:true, tag:1});
			page2.jenis = new saiLabelEdit(this.p1mp.childPage[2],{bound:[410,1,200,20], caption:"Jenis", readOnly:true, tag:1});			
			page2.ubis = new saiLabelEdit(this.p1mp.childPage[2],{bound:[10,2,300,20], caption:"UBIS", readOnly:true, tag:1});
			page2.modul = new saiLabelEdit(this.p1mp.childPage[2],{bound:[410,2,200,20], caption:"Modul", readOnly:true, tag:1});			
			page2.tgl = new saiLabelEdit(this.p1mp.childPage[2],{bound:[10,3,200,20], caption:"Tanggal", readOnly:true, tag:1});
			page2.nilai = new saiLabelEdit(this.p1mp.childPage[2],{bound:[410,3,200,20], caption:"Nilai Usulan", readOnly:true, tag:1, tipeText:ttNilai});
			page2.ket = new saiLabelEdit(this.p1mp.childPage[2],{bound:[10,4,600,20], caption:"Keterangan", readOnly:true, tag:1});			
			page2.nd = new saiLabelEdit(this.p1mp.childPage[2],{bound:[10,6,400,20], caption:"No Nota Dinas", readOnly:true, tag:1});
			page2.filend = new saiLabelEdit(this.p1mp.childPage[2],{bound:[10,7,400,20], caption:"File NoDin", readOnly:true, tag:1});									
			page2.bpdrk1 = new button(page2, {bound:[110,8,80,20],caption:"PDRK-1", click:[this,"doClick"]});
			page2.bpdrk2 = new button(page2, {bound:[200,8,80,20],caption:"PDRK-2", click:[this,"doClick"]});
			page2.bpdrk3 = new button(page2, {bound:[290,8,80,20],caption:"PDRK-3", click:[this,"doClick"]});			
            page2.rearrangeChild(10,23);            
			page2.bpdrk = new control(page2, {bound:[10,page2.bpdrk1.top + 23,page2.width - 20, page2.height - (page2.bpdrk1.top + 47)]});
				
            page2 = this.p1mp.childPage[3];
			page2.no_rev = new saiLabelEdit(this.p1mp.childPage[3],{bound:[10,1,200,20], caption:"No Review", readOnly:true, tag:1});
			page2.jenis = new saiLabelEdit(this.p1mp.childPage[3],{bound:[410,1,200,20], caption:"Jenis", readOnly:true, tag:1});			
			page2.ubis = new saiLabelEdit(this.p1mp.childPage[3],{bound:[10,2,300,20], caption:"GUBIS", readOnly:true, tag:1});
			page2.modul = new saiLabelEdit(this.p1mp.childPage[3],{bound:[410,2,200,20], caption:"Modul", readOnly:true, tag:1});			
			page2.tgl = new saiLabelEdit(this.p1mp.childPage[3],{bound:[10,3,200,20], caption:"Tanggal", readOnly:true, tag:1});
			page2.nilai = new saiLabelEdit(this.p1mp.childPage[3],{bound:[410,3,200,20], caption:"Nilai Usulan", readOnly:true, tipeText:ttNilai, tag:1});
			page2.ket = new saiLabelEdit(this.p1mp.childPage[3],{bound:[10,4,600,20], caption:"Keterangan", readOnly:true, tag:1});			
			page2.nd = new saiLabelEdit(this.p1mp.childPage[3],{bound:[10,6,400,20], caption:"No Nota Dinas", readOnly:true, tag:1});
			page2.filend = new saiLabelEdit(this.p1mp.childPage[3],{bound:[10,7,400,20], caption:"File NoDin", readOnly:true, tag:1});
			
            page2.filend = new saiLabelEdit(this.p1mp.childPage[3],{bound:[10,7,400,20], caption:"File NoDin", readOnly:true, tag:1});									
			page2.bpdrk1 = new button(page2, {bound:[110,8,80,20],caption:"PDRK-1", click:[this,"doClick"]});
			page2.bpdrk2 = new button(page2, {bound:[200,8,80,20],caption:"PDRK-2", click:[this,"doClick"]});
			page2.bpdrk3 = new button(page2, {bound:[290,8,80,20],caption:"PDRK-3", click:[this,"doClick"]});			
            page2.rearrangeChild(10,23);            
			page2.bpdrk = new control(page2, {bound:[10,page2.bpdrk1.top + 23,page2.width - 20, page2.height - (page2.bpdrk1.top + 47)]});
            
			page2 = this.p1mp.childPage[4];
			page2.no_rev = new saiLabelEdit(this.p1mp.childPage[4],{bound:[10,1,200,20], caption:"No Review", readOnly:true, tag:1});
			page2.jenis = new saiLabelEdit(this.p1mp.childPage[4],{bound:[410,1,200,20], caption:"Jenis", readOnly:true, tag:1});			
			page2.ubis = new saiLabelEdit(this.p1mp.childPage[4],{bound:[10,2,300,20], caption:"UBIS", readOnly:true, tag:1});
			page2.modul = new saiLabelEdit(this.p1mp.childPage[4],{bound:[410,2,200,20], caption:"Modul", readOnly:true, tag:1});
			page2.tgl = new saiLabelEdit(this.p1mp.childPage[4],{bound:[10,3,200,20], caption:"Tanggal", readOnly:true, tag:1});
			page2.nilai = new saiLabelEdit(this.p1mp.childPage[4],{bound:[410,3,200,20], caption:"Nilai Usulan", readOnly:true, tag:1, tipeText:ttNilai});
			page2.ket = new saiLabelEdit(this.p1mp.childPage[4],{bound:[10,4,600,20], caption:"Keterangan", readOnly:true, tag:1});			
			page2.nd = new saiLabelEdit(this.p1mp.childPage[4],{bound:[10,6,400,20], caption:"No Nota Dinas", readOnly:true, tag:1});
			page2.filend = new saiLabelEdit(this.p1mp.childPage[4],{bound:[10,7,400,20], caption:"File NoDin", readOnly:true, tag:1});					           
			page2.bpdrk1 = new button(page2, {bound:[110,8,80,20],caption:"PDRK-1", click:[this,"doClick"]});
			page2.bpdrk2 = new button(page2, {bound:[200,8,80,20],caption:"PDRK-2", click:[this,"doClick"]});
			page2.bpdrk3 = new button(page2, {bound:[290,8,80,20],caption:"PDRK-3", click:[this,"doClick"]});			
            page2.rearrangeChild(10,23);            
			page2.bpdrk = new control(page2, {bound:[10,page2.bpdrk1.top + 23,page2.width - 20, page2.height - (page2.bpdrk1.top + 47)]});
            
			page2 = this.p1mp.childPage[5];
			page2.no_rev = new saiLabelEdit(page2,{bound:[10,1,200,20], caption:"No Review", readOnly:true, tag:1});
			page2.jenis = new saiLabelEdit(page2,{bound:[410,1,200,20], caption:"Jenis", readOnly:true, tag:1});			
			page2.ubis = new saiLabelEdit(page2,{bound:[10,2,300,20], caption:"UBIS", readOnly:true, tag:1});
			page2.modul = new saiLabelEdit(page2,{bound:[410,2,200,20], caption:"Modul", readOnly:true, tag:1});
			page2.tgl = new saiLabelEdit(page2,{bound:[10,3,200,20], caption:"Tanggal", readOnly:true, tag:1});
			page2.nilai = new saiLabelEdit(page2,{bound:[410,3,200,20], caption:"Nilai Usulan", readOnly:true, tag:1, tipeText:ttNilai});
			page2.ket = new saiLabelEdit(page2,{bound:[10,4,600,20], caption:"Keterangan", readOnly:true, tag:1});			
			page2.nd = new saiLabelEdit(page2,{bound:[10,6,400,20], caption:"No Nota Dinas", readOnly:true, tag:1});
			page2.filend = new saiLabelEdit(page2,{bound:[10,7,400,20], caption:"File NoDin", readOnly:true, tag:1});					           
			page2.bpdrk1 = new button(page2, {bound:[110,8,80,20],caption:"PDRK-1", click:[this,"doClick"]});
			page2.bpdrk2 = new button(page2, {bound:[200,8,80,20],caption:"PDRK-2", click:[this,"doClick"]});
			page2.bpdrk3 = new button(page2, {bound:[290,8,80,20],caption:"PDRK-3", click:[this,"doClick"]});			
			
            page2.rearrangeChild(10,23);
            
			page2 = this.p1mp.childPage[6];
			page2.no_rev = new saiLabelEdit(this.p1mp.childPage[6],{bound:[10,1,200,20], caption:"No SUKKA", readOnly:true, tag:1});
			page2.ubis = new saiLabelEdit(this.p1mp.childPage[6],{bound:[10,2,300,20], caption:"UBIS", readOnly:true, tag:1});
			page2.tgl = new saiLabelEdit(this.p1mp.childPage[6],{bound:[10,3,200,20], caption:"Tanggal", readOnly:true, tag:1});			
			page2.jenis = new saiLabelEdit(this.p1mp.childPage[6],{bound:[10,8,200,20], caption:"Jenis", readOnly:true, tag:1});
			page2.modul = new saiLabelEdit(this.p1mp.childPage[6],{bound:[10,9,200,20], caption:"Modul", readOnly:true, tag:1});			
			page2.sukka = new control(this.p1mp.childPage[6],{bound:[10,9,200,20], caption:"Modul", readOnly:true, tag:1});	
            page2.rearrangeChild(10,23);
			//tracking
			page2 = this.p1mp.childPage[7];
			page2.lPDRK = new label(page2, {bound:[10,0,500,30], caption:" NO PDRK : ", fontSize:18});
			page2.lProgress = new label(page2, {bound:[10,1,500,30], caption:" ", fontSize:18});
			page2.lSpace = new label(page2, {bound:[10,2,500,30], caption:" ", fontSize:18});
			page2.p1 = new panel(page2,{bound:[10,1,450,150], caption:"Proses UBIS"});
			page2.p1.ePengaju = new saiLabelEdit(page2.p1,{bound:[10,3,300,20], caption:"Pengaju", readOnly:true, tag:1});
			page2.p1.tPengaju = new saiLabelEdit(page2.p1,{bound:[320,3,100,20], labelWidth:30, caption:"Tgl", readOnly:true, tag:1});						
			page2.p1.eReview = new saiLabelEdit(page2.p1,{bound:[10,4,300,20], caption:"Review", readOnly:true, tag:1});
			page2.p1.tReview = new saiLabelEdit(page2.p1,{bound:[320,4,100,20], labelWidth:30, caption:"Tgl", readOnly:true, tag:1});
			page2.p1.eApp1 = new saiLabelEdit(page2.p1,{bound:[10,5,300,20], caption:"Approve Agg", readOnly:true, tag:1});
			page2.p1.tApp1 = new saiLabelEdit(page2.p1,{bound:[320,5,100,20], labelWidth:30,caption:"Tgl", readOnly:true, tag:1});
			page2.p1.eApp2 = new saiLabelEdit(page2.p1,{bound:[10,6,300,20], caption:"App. Pnj. Prog.", readOnly:true, tag:1});
			page2.p1.tApp2 = new saiLabelEdit(page2.p1,{bound:[320,6,100,20], labelWidth:30,caption:"Tgl", readOnly:true, tag:1});            
			page2.p1.eApp3 = new saiLabelEdit(page2.p1,{bound:[10,7,300,20], caption:"Mengetahui.", readOnly:true, tag:1});
			page2.p1.tApp3 = new saiLabelEdit(page2.p1,{bound:[320,7,100,20], labelWidth:30,caption:"Tgl", readOnly:true, tag:1});            
            page2.p1.rearrangeChild(25,23);
            
            page2.p2 = new panel(page2,{bound:[470,1,450,150], caption:"Proses FC"});
			page2.p2.eReview = new saiLabelEdit(page2.p2,{bound:[10,3,300,20], caption:"Review Keep", readOnly:true, tag:1});
			page2.p2.tReview = new saiLabelEdit(page2.p2,{bound:[320,3,100,20], labelWidth:30, caption:"Tgl", readOnly:true, tag:1});						
			page2.p2.eKeep = new saiLabelEdit(page2.p2,{bound:[10,4,300,20], caption:"Keep", readOnly:true, tag:1});
			page2.p2.tKeep = new saiLabelEdit(page2.p2,{bound:[320,4,100,20], labelWidth:30, caption:"Tgl", readOnly:true, tag:1});			
			page2.p2.eReview2 = new saiLabelEdit(page2.p2,{bound:[10,5,300,20], caption:"Review ", readOnly:true, tag:1});
			page2.p2.tReview2 = new saiLabelEdit(page2.p2,{bound:[320,5,100,20], labelWidth:30, caption:"Tgl", readOnly:true, tag:1});									
			page2.p2.eApp1 = new saiLabelEdit(page2.p2,{bound:[10,6,300,20], caption:"Approve", readOnly:true, tag:1});
			page2.p2.tApp1 = new saiLabelEdit(page2.p2,{bound:[320,6,100,20], labelWidth:30,caption:"Tgl", readOnly:true, tag:1});			
			page2.p2.eSAP = new saiLabelEdit(page2.p2,{bound:[10,7,300,20], caption:"Proses SAP", readOnly:true, tag:1});
			page2.p2.tSAP = new saiLabelEdit(page2.p2,{bound:[320,7,100,20], labelWidth:30,caption:"Tgl", readOnly:true, tag:1});			
            page2.p2.rearrangeChild(25,23);
            
            page2.p3 = new panel(page2,{bound:[10,2,450,80], caption:"Proses Group Bisnis"});
			page2.p3.eReview = new saiLabelEdit(page2.p3,{bound:[10,3,300,20], caption:"Review", readOnly:true, tag:1});
			page2.p3.tReview = new saiLabelEdit(page2.p3,{bound:[320,3,100,20], labelWidth:30, caption:"Tgl", readOnly:true, tag:1});						
			page2.p3.eApp1 = new saiLabelEdit(page2.p3,{bound:[10,5,300,20], caption:"Approve ", readOnly:true, tag:1});
			page2.p3.tApp1 = new saiLabelEdit(page2.p3,{bound:[320,5,100,20], labelWidth:30,caption:"Tgl", readOnly:true, tag:1});			
            page2.p3.rearrangeChild(25,23);
            page2.p4 = new panel(page2,{bound:[470,2,450,80], caption:"Proses Dir. Kug"});
			page2.p4.eReview = new saiLabelEdit(page2.p4,{bound:[10,3,300,20], caption:"Review", readOnly:true, tag:1});
			page2.p4.tReview = new saiLabelEdit(page2.p4,{bound:[320,3,100,20], labelWidth:30, caption:"Tgl", readOnly:true, tag:1});						
			page2.p4.eApp1 = new saiLabelEdit(page2.p4,{bound:[10,5,300,20], caption:"Approve ", readOnly:true, tag:1});
			page2.p4.tApp1 = new saiLabelEdit(page2.p4,{bound:[320,5,100,20], labelWidth:30,caption:"Tgl", readOnly:true, tag:1});			
            page2.p4.rearrangeChild(25,23);
            page2.p5 = new panel(page2,{bound:[10,3,450,100], caption:"Proses SUKKA"});
            page2.p5.ePengaju = new saiLabelEdit(page2.p5,{bound:[10,1,300,20], caption:"Pembuat", readOnly:true, tag:1});
			page2.p5.tPengaju = new saiLabelEdit(page2.p5,{bound:[320,1,100,20], labelWidth:30, caption:"Tgl", readOnly:true, tag:1});						
			page2.p5.eReview = new saiLabelEdit(page2.p5,{bound:[10,3,300,20], caption:"Review", readOnly:true, tag:1});
			page2.p5.tReview = new saiLabelEdit(page2.p5,{bound:[320,3,100,20], labelWidth:30, caption:"Tgl", readOnly:true, tag:1});						
			page2.p5.eApp1 = new saiLabelEdit(page2.p5,{bound:[10,5,300,20], caption:"Approve", readOnly:true, tag:1});
			page2.p5.tApp1 = new saiLabelEdit(page2.p5,{bound:[320,5,100,20], labelWidth:30,caption:"Tgl", readOnly:true, tag:1});			
            page2.p5.rearrangeChild(25,23);
            page2.rearrangeChild(10,23);
			
			
			this.pager = 25;
			this.userLogin="";					
			var sql =  "select  count(*) "+
					" from rra_pdrk_m a "+
					" where a.kode_lokasi = '"+this.app._lokasi+"' ";
		
			this.sqlCount = sql;
			
            this.pFilter = new roundPanel(this,{bound:[this.width - 520,35,500,250],caption:"Filter",visible:false,background:"image/themes/dynpro/roundpanelBgCenter.png",icon:"image/themes/dynpro/iconpanel.png",color:"#edf5f8",titleBg:"#95cae8"});          
            
            this.bApply = new button(this.pFilter,{bound:[10,160,80,20],caption:"Apply",click:[this,"doClick"]});
			this.sgFilter = new saiGrid(this.pFilter,{bound:[10,0,this.pFilter.width - 30,150],colCount:4,rowCount:4,
				colTitle:["Filter","Type","Value1","Value2"],selectCell:[this,"doSelectFilterCell"],ellipsClick:[this,"doEllipsFilterClick"],change:[this,"sg1onChange"],
				colWidth:[[3,2,1,0],[100,100,60,150]]});
			this.sgFilter.columns.get(1).setButtonStyle(window.bsAuto);
			var val = new arrayMap({items:["All","=","Range","Like","<="]});			
			this.sgFilter.columns.get(1).setPicklist(val);
            this.pFilter.setTabChildIndex();			
			this.sql = "select distinct a.no_pdrk, bb.nama as ubis, a.keterangan, "+				
						"	cc.nilai , a.no_nd, a.file_nd, nvl(k.sts_pdrk, nvl(i.sts_pdrk, nvl(b.sts_pdrk,a.sts_pdrk))) as sts_pdrk, a.jenis_agg, a.sub_jenis "+
						" , a.progress, b.progress as prog_rev, i.progress as prog_grev, k.progress as prog_mrev, g.progress as prog_frev "+						
						
						" , a.nik_user, date_format(a.tanggal, '%d-%m-%Y') as tgl "+
						" , a.nik_buat, date_format(b.tanggal,'%d-%m-%Y') as tgl1 "+
						" , nvl(b.nik_review,a.nik_review) as nik_review, date_format(c.tanggal,'%d-%m-%Y') as tgl2 "+						
						" , a.nik_apppdrk3, date_format(d.tanggal, '%d-%m-%Y') as tgl3 "+
						
						" , a.nik_apppdrk32, date_format(dd.tanggal, '%d-%m-%Y') as tgl32 "+
						" , a.nik_appjust, date_format(d.tanggal, '%d-%m-%Y') as tgl21 "+
						" , a.nik_appjust2, date_format(d.tanggal, '%d-%m-%Y') as tgl22 "+						
						
						" , e.nik_user as fc1, date_format(e.tanggal, '%d-%m-%Y') as tgl4 "+
						" , f.nik_user as fc2, date_format(f.tanggal, '%d-%m-%Y') as tgl5 "+
						" , g.nik_user as fc3, date_format(g.tanggal, '%d-%m-%Y') as tgl6 "+
						" , h.nik_user as fc4, date_format(h.tanggal, '%d-%m-%Y') as tgl7 "+
						" , o.nik_user as fc5, date_format(o.tanggal, '%d-%m-%Y') as tgl15 "+
						
						" , i.nik_user as gr1, date_format(i.tanggal, '%d-%m-%Y') as tgl8 "+
						" , j.nik_user as gr2, date_format(j.tanggal, '%d-%m-%Y') as tgl9 "+
						" , k.nik_user as ma1, date_format(k.tanggal, '%d-%m-%Y') as tgl10 "+
						" , l.nik_user as ma2, date_format(l.tanggal, '%d-%m-%Y') as tgl11 "+
						" , m.nik_buat as su1, date_format(m.tanggal, '%d-%m-%Y') as tgl12 "+
						" , a.nik_review as su2, mm.no_surat as tgl13 "+
						" , a.nik_app3 as su3, date_format(n.tanggal, '%d-%m-%Y') as tgl14 "+
						" , i.sts_pdrk as sts_pdrk2, k.sts_pdrk as sts_pdrk3 "+
						" , a.sts_pdrk as sts_pdrk1 "+
						" , b.sts_pdrk as sts_pdrk4 "+
						" from rra_pdrk_m a "+
						"	inner join rra_ubis bb on bb.kode_ubis = a.kode_ubis and bb.kode_lokasi = a.kode_lokasi "+
						"	left outer join (select no_bukti, sum(nilai) as nilai from rra_anggaran where dc='D' and kode_lokasi = '"+this.app._lokasi+"' group by no_bukti ) cc on cc.no_bukti = a.no_pdrk  "+
						"	left outer join rra_rev_m b on b.no_pdrk = a.no_pdrk and b.kode_lokasi = a.kode_lokasi "+
						"	left outer join (select distinct z.catatan as no_pdrk, x.tanggal, x.nik_app, x.kode_lokasi from rra_app_m x inner join rra_app_d z on z.no_app = x.no_app and z.kode_lokasi = x.kode_lokasi where x.no_app like 'APP%') c on c.no_pdrk = a.no_pdrk and c.kode_lokasi = a.kode_lokasi and c.nik_app = nvl(b.nik_review,a.nik_review) "+
						"	left outer join (select distinct z.catatan as no_pdrk, x.tanggal, x.nik_app, x.kode_lokasi from rra_app_m x inner join rra_app_d z on z.no_app = x.no_app and z.kode_lokasi = x.kode_lokasi where x.no_app like 'APP%') d on d.no_pdrk = a.no_pdrk and d.kode_lokasi = a.kode_lokasi and d.nik_app = nvl(b.nik_apppdrk3,a.nik_apppdrk3) "+
						"	left outer join (select distinct z.catatan as no_pdrk, x.tanggal, x.nik_app, x.kode_lokasi from rra_app_m x inner join rra_app_d z on z.no_app = x.no_app and z.kode_lokasi = x.kode_lokasi where x.no_app like 'APP%') dd on dd.no_pdrk = a.no_pdrk and d.kode_lokasi = a.kode_lokasi and dd.nik_app = nvl(b.nik_apppdrk32,a.nik_apppdrk32) "+
						
						"	left outer join (select distinct z.catatan as no_pdrk, x.tanggal, x.nik_user, x.kode_lokasi from rra_app_m x inner join rra_app_d z on z.no_app = x.no_app and z.kode_lokasi = x.kode_lokasi where x.no_app like 'FCRK%') e on e.no_pdrk = a.no_pdrk and e.kode_lokasi = a.kode_lokasi "+
						"	left outer join (select distinct z.catatan as no_pdrk, x.tanggal, x.nik_user, x.kode_lokasi from rra_app_m x inner join rra_app_d z on z.no_app = x.no_app and z.kode_lokasi = x.kode_lokasi where x.no_app like 'FCKEP%') f on f.no_pdrk = a.no_pdrk and f.kode_lokasi = a.kode_lokasi "+
						"	left outer join rra_frev_m g on g.no_pdrk = a.no_pdrk and g.kode_lokasi = a.kode_lokasi and g.no_frev like 'FREV%' "+
						"	left outer join (select distinct z.catatan as no_pdrk, x.tanggal, x.nik_user, x.kode_lokasi from rra_app_m x inner join rra_app_d z on z.no_app = x.no_app and z.kode_lokasi = x.kode_lokasi where x.no_app like 'APPFC%') h on h.no_pdrk = a.no_pdrk and h.kode_lokasi = a.kode_lokasi "+
						"	left outer join (select distinct z.catatan as no_pdrk, x.tanggal, x.nik_user, x.kode_lokasi from rra_app_m x inner join rra_app_d z on z.no_app = x.no_app and z.kode_lokasi = x.kode_lokasi where x.no_app like 'FCTRN%') o on o.no_pdrk = a.no_pdrk and o.kode_lokasi = a.kode_lokasi "+
						
						"	left outer join rra_grev_m i on i.no_pdrk = a.no_pdrk and i.kode_lokasi = a.kode_lokasi "+
						"	left outer join (select distinct z.catatan as no_pdrk, x.tanggal, x.nik_user, x.kode_lokasi from rra_app_m x inner join rra_app_d z on z.no_app = x.no_app and z.kode_lokasi = x.kode_lokasi where x.no_app like 'GAPP%') j on j.no_pdrk = a.no_pdrk and j.kode_lokasi = a.kode_lokasi "+
						
						"	left outer join rra_mrev_m k on k.no_pdrk = a.no_pdrk and k.kode_lokasi = a.kode_lokasi "+
						"	left outer join (select distinct z.catatan as no_pdrk, x.tanggal, x.nik_user, x.kode_lokasi from rra_app_m x inner join rra_app_d z on z.no_app = x.no_app and z.kode_lokasi = x.kode_lokasi where x.no_app like 'MAPP%') l on l.no_pdrk = a.no_pdrk and l.kode_lokasi = a.kode_lokasi "+
						
						"	left outer join rra_sukka m on m.no_pdrk = a.no_pdrk and m.kode_lokasi = a.kode_lokasi "+						
						"	left outer join rra_nosukka mm on mm.no_sukka = m.no_sukka and mm.kode_lokasi = a.kode_lokasi "+						
						"	left outer join (select distinct z.catatan as no_pdrk, x.tanggal, x.nik_user, x.kode_lokasi from rra_app_m x inner join rra_app_d z on z.no_app = x.no_app and z.kode_lokasi = x.kode_lokasi where x.no_app like 'APP%SK%') n on n.no_pdrk = a.no_pdrk and n.kode_lokasi = a.kode_lokasi "+
						" where a.kode_lokasi = '"+this.app._lokasi+"'    ";
			
			this.filter = " and a.kode_ubis = '"+this.app._kodeUbis+"'";
			this.rowCount = this.dbLib.getRowCount(sql + this.filter, this.pager);
			
            this.sgn.setTotalPage(this.rowCount);            			
            this.sgn.rearrange();
            
			this.doPager(this.sgn,1);			
			this.sgFilter.editData(0,["Periode","All","",""]);
			this.sgFilter.editData(1,["UBIS","=",this.app._kodeUbis,""]);			
			this.sgFilter.editData(2,["No PDRK","All","",""]);											
			this.sgFilter.editData(3,["Modul","All","",""]);											
			this.filterRep = new util_filterRep();			
			this.app._mainForm.pButton.hide();
			
		}catch(e){
			alert(e);
		}
	},
	doToolBarClick: function(sender, id){
	   switch(id){
	       case "bFilter" :   
	           this.pFilter.setVisible(!this.pFilter.visible);
	       break;
       }	   
    },	
    doClick: function(sender){
        try{
			if (sender == this.p1mp.childPage[0].bpdrk1){
				//var data = this.dbLib.getDataProvider("select justifik",true);
			}
            if (sender == this.bApply){
                this.filter = this.filterRep.filterStr("a.kode_ubis",this.sgFilter.getCell(1,1),this.sgFilter.getCell(2,1),this.sgFilter.getCell(3,1),"and")+
				    this.filterRep.filterStr("a.no_pdrk",this.sgFilter.getCell(1,2),this.sgFilter.getCell(2,2),this.sgFilter.getCell(3,2),"and")+
				    this.filterRep.filterStr("a.periode",this.sgFilter.getCell(1,0),this.sgFilter.getCell(2,0),this.sgFilter.getCell(3,0),"and")+
				    this.filterRep.filterStr("a.jenis_agg",this.sgFilter.getCell(1,3),this.sgFilter.getCell(2,3),this.sgFilter.getCell(3,3),"and");
				
    			this.rowCount = this.dbLib.getRowCount(this.sqlCount+this.filter, this.pager);				
				
                this.sgn.setTotalPage(this.rowCount);            			
                this.sgn.rearrange();
                
    	        this.doPager(this.sgn,1);		        
    	        this.pFilter.hide();
            }            
       }catch(e){
            alert(e);
       }
    },
    
	doPager: function(sender,page){
		try{
			   this.activePage = page;				   	
			   this.dbLib.getDataProviderPageA(this.sql+this.filter,page, this.pager, undefined, this);   			 
		}catch(e){
			error_log(e);
		}
    },
	doRequestReady: function(sender, methodName, result, callbackObj){				
		try{
		   if (sender === this.dbLib && this == callbackObj) {
			   	if (methodName == "getDataProviderPage") {				
			   		eval("brg = " + result + ";");
			   		if (typeof(brg) !== "string") {
			   			this.sg1mp.clear();
			   			this.gridDataTmp = new arrayMap();
			   			if (brg.rs.rows[0] != undefined) {
			   				this.sg1mp.showLoading();
			   				var line;
			   				for (var i in brg.rs.rows) {
			   					line = brg.rs.rows[i];
			   					this.gridDataTmp.set(line.no_pdrk, line);			   					
			   					var data = [];

			   					data[0] = line.tgl1 != "-" ? "<img width=17 height=17 src='icon/green.png' />." : "<img width=17 height=17 src='icon/red.png' />.";
			   					data[1] = line.tgl2 != "-" ? "<img width=17 height=17 src='icon/green.png' />." : (line.tgl1 != "-" ? "<img width=17 height=17 src='icon/red.png' />." : "<img width=17 height=17 src='icon/grey.png' />.");
			   					data[2] = line.tgl3 != "-" ? "<img width=17 height=17 src='icon/green.png' />." : (line.tgl2 != "-" ? "<img width=17 height=17 src='icon/red.png' />." : "<img width=17 height=17 src='icon/grey.png' />.");
			   					//error_log(line.prog_rev);
			   					data[3] = line.sts_pdrk1 == "ABT" && line.prog_rev != "A" && line.progress != "0" ? "<img width=17 height=17 src='icon/green.png' />." : (line.prog_rev == "A" && line.sts_pdrk1 == "ABT" ? "<img width=17 height=17 src='icon/red.png' />." : line.sts_pdrk1 == "ABT" ? "<img width=17 height=17 src='icon/grey.png' />." : ".");
			   					
			   					data[4] = line.sts_pdrk1 == "ABT" || line.sts_pdrk1 == "OPN" ? (line.gr1 != "-" ? "<img width=17 height=17 src='icon/green.png' />." : (line.tgl3 != "-" ? "<img width=17 height=17 src='icon/red.png' />." : "<img width=17 height=17 src='icon/grey.png' />.")) : ".";			   					
			   					data[5] = line.sts_pdrk1 == "ABT" || line.sts_pdrk1 == "OPN" ? (line.gr2 != "-" ? "<img width=17 height=17 src='icon/green.png' />." : (line.gr1 != "-" ? "<img width=17 height=17 src='icon/red.png' />." :"<img width=17 height=17 src='icon/grey.png' />.") ): ".";
			   					
			   					data[6] = line.sts_pdrk2 == "ABT" ? (line.ma1 != "-" ? "<img width=17 height=17 src='icon/green.png' />." : (line.gr2 != "-" ? "<img width=17 height=17 src='icon/red.png' />." : "<img width=17 height=17 src='icon/grey.png' />.")) : ".";			   					
			   					data[7] = line.sts_pdrk2 == "ABT" ? (line.ma2 != "-" ? "<img width=17 height=17 src='icon/green.png' />." : (line.ma1 != "-" ? "<img width=17 height=17 src='icon/red.png' />." : "<img width=17 height=17 src='icon/grey.png' />.")) : ".";			   					
			   					
			   					data[8] = line.sts_pdrk == 'RRR' ? (line.fc1 != "-" || line.fc3 != "-" ? "<img width=17 height=17 src='icon/green.png' />." : (line.ma1 != "-" ? "<img width=17 height=17 src='icon/red.png' />." : line.gr1 != "-" ? "<img width=17 height=17 src='icon/red.png' />." : line.tg1 != "-" ? "<img width=17 height=17 src='icon/red.png' />." : "<img width=17 height=17 src='icon/grey.png' />.")) : ".";
			   					data[9] = line.sts_pdrk == 'RRR' ? (line.fc2 != "-" || line.fc3 != "-" ? "<img width=17 height=17 src='icon/green.png' />." : (line.fc1 != "-" ? "<img width=17 height=17 src='icon/red.png' />." : "<img width=17 height=17 src='icon/grey.png' />.")) : ".";
			   					
			   					data[10] = line.fc3 != "-" ? "<img width=17 height=17 src='icon/green.png' />." : (line.ma2 != "-" ? "<img width=17 height=17 src='icon/red.png' />." : line.gr2 != "-" && line.sts_pdrk == "RRR"? "<img width=17 height=17 src='icon/red.png' />." : (line.tgl3 != "-" && line.sts_pdrk =="STB") ? "<img width=17 height=17 src='icon/red.png' />." :  "<img width=17 height=17 src='icon/grey.png' />.");
			   					data[11] = line.fc4 != "-" ? "<img width=17 height=17 src='icon/green.png' />." : (line.fc3 != "-" ? "<img width=17 height=17 src='icon/red.png' />." : "<img width=17 height=17 src='icon/grey.png' />." );
			   					
			   					data[12] = line.tgl12 != "-" ? "<img width=17 height=17 src='icon/green.png' />." : (line.fc4 != "-" ?  "<img width=17 height=17 src='icon/red.png' />." : "<img width=17 height=17 src='icon/grey.png' />.");
			   					data[13] = line.tgl13 != "-" ? "<img width=17 height=17 src='icon/green.png' />." : (line.tgl12 != "-" ?  "<img width=17 height=17 src='icon/red.png' />." : "<img width=17 height=17 src='icon/grey.png' />.");
			   					//error_log(line.tgl14);
			   					data[14] = line.tgl14 != "-" ? "<img width=17 height=17 src='icon/green.png' />." : (line.tgl13 != "-" ?  "<img width=17 height=17 src='icon/red.png' />." : "<img width=17 height=17 src='icon/grey.png' />.");
			   					
			   					data[15] = line.fc5 != "-" ? "<img width=17 height=17 src='icon/green.png' />." : (line.tgl14 != "-" ?  "<img width=17 height=17 src='icon/red.png' />." : "<img width=17 height=17 src='icon/grey.png' />.");
			   					
			   					data[16] = line.no_pdrk, data[17] = line.ubis, data[18] = line.tgl, data[19] = line.keterangan;
			   					data[20] = floatToNilai(line.nilai), data[21] = line.no_nd, data[22] = line.file_nd,data[23] = line.sts_pdrk, data[24] = line.jenis_agg;
			   					data[25] = line.sub_jenis;
			   					this.sg1mp.appendData(data);
			   					this.sg1mp.rows.get(i).setData(line);			   				
							}
							this.sg1mp.hideLoading();
							this.sg1mp.frame.scrollTop = 0;
							this.sg1mp.setNoUrut((this.activePage - 1) * this.pager);
						}
					}
				}			
			}		   
		  }catch(e){
		  	system.alert(e,result);
		  }
	},
	doSgBtnClick: function(sender, col, row){
		try{
			if (col === 2)
				window.open("server/media/"+this.sg1mp2.getCell(1,row));
		}catch(e){
			alert(e);
		}
	},
	sg1onDblClick:function(sender, col, row){
		try{	
			if (sender == this.sg1mp){
				var sql = new  server_util_arrayList();
				this.doViewReport(sender.cells(16, row));
				sql.add("select a.no_rev, b.nama as ubis, date_format(a.tanggal, '%d-%m-%Y') as tgl, a.keterangan, "+
					"	c.nilai , a.no_nd, a.file_nd, a.sts_pdrk, a.jenis_agg "+
					" from rra_rev_m a "+
					" inner join rra_ubis b on b.kode_ubis = a.kode_ubis and b.kode_lokasi = a.kode_lokasi "+
					" inner join (select kode_lokasi, no_rev, sum(nilai) as nilai from rra_rev_d where dc='D' group by kode_lokasi, no_rev) c on c.no_rev = a.no_rev and c.kode_lokasi = a.kode_lokasi "+
					" where a.no_pdrk = '"+sender.cells(16, row)+"' ");
				sql.add("select a.no_grev, b.nama as gubis, date_format(a.tanggal, '%d-%m-%Y') as tgl, a.keterangan, "+
					"	c.nilai , a.no_nd, a.file_nd, a.sts_pdrk, a.jenis_agg "+
					" from rra_grev_m a "+
					" inner join rra_gubis b on b.kode_gubis = a.kode_gubis and b.kode_lokasi = a.kode_lokasi "+
					" inner join (select kode_lokasi, no_grev, sum(nilai) as nilai from rra_grev_d where dc='D' group by kode_lokasi, no_grev) c on c.no_grev = a.no_grev and c.kode_lokasi = a.kode_lokasi "+
					" where a.no_pdrk = '"+sender.cells(16, row)+"' ");
				sql.add("select a.no_mrev, b.nama as ubis, date_format(a.tanggal, '%d-%m-%Y') as tgl, a.keterangan, "+
					"	c.nilai , a.no_nd, a.file_nd, a.sts_pdrk, a.jenis_agg "+
					" from rra_mrev_m a "+
					" inner join rra_ubis b on b.kode_ubis = a.kode_ubis and b.kode_lokasi = a.kode_lokasi "+
					" inner join (select kode_lokasi, no_mrev, sum(nilai) as nilai from rra_mrev_d where dc='D' group by kode_lokasi, no_mrev) c on c.no_mrev = a.no_mrev and c.kode_lokasi = a.kode_lokasi "+
					" where a.no_pdrk = '"+sender.cells(16, row)+"' ");
				sql.add("select a.no_app, b.nama as ubis, date_format(a.tanggal, '%d-%m-%Y') as tgl, a.keterangan "+					
					" from rra_app_m a "+
					"	inner join rra_app_d c on c.no_app = a.no_app and c.kode_lokasi = a.kode_lokasi "+
					"	inner join (select a.no_pdrk, a.no_rev, c.nama from rra_rev_m a "+
						" 	inner join rra_pdrk_m b on b.no_pdrk = a.no_pdrk and b.kode_lokasi = a.kode_lokasi "+
						"	 inner join rra_ubis c on c.kode_ubis = b.kode_ubis and c.kode_lokasi = a.kode_lokasi "+
						" 	where b.no_pdrk = '"+sender.cells(16, row)+"' and a.sts_pdrk = 'RRR' "+
						"	union "+
						" select a.no_pdrk, a.no_grev, c.nama from rra_grev_m a "+
						" 	inner join rra_pdrk_m b on b.no_pdrk = a.no_pdrk and b.kode_lokasi = a.kode_lokasi "+
						"	 inner join rra_ubis c on c.kode_ubis = b.kode_ubis and c.kode_lokasi = a.kode_lokasi "+
						" 	where b.no_pdrk = '"+sender.cells(16, row)+"' and a.sts_pdrk = 'RRR' "+
						"	union "+
						" select a.no_pdrk, a.no_mrev, c.nama from rra_mrev_m a "+
						" 	inner join rra_pdrk_m b on b.no_pdrk = a.no_pdrk and b.kode_lokasi = a.kode_lokasi "+
						"	 inner join rra_ubis c on c.kode_ubis = b.kode_ubis and c.kode_lokasi = a.kode_lokasi "+
						" 	where b.no_pdrk = '"+sender.cells(16, row)+"' and a.sts_pdrk = 'RRR' "+
						") b on b.no_rev = c.no_bukti "+
					" where a.jenis_form = 'FCREV' ");
				sql.add("select a.no_sukka, b.nama as ubis,date_format(a.tanggal, '%d-%m-%Y') as tgl, "+				
					"	 a.modul, c.sts_pdrk  "+
					" from rra_sukka a "+
					"	inner join rra_pdrk_m c on c.no_pdrk = a.no_pdrk and c.kode_lokasi = a.kode_lokasi "+
					" inner join rra_ubis b on b.kode_ubis = c.kode_ubis and b.kode_lokasi = a.kode_lokasi "+
					" where a.no_pdrk = '"+sender.cells(16, row)+"' ");	
				sql.add("select distinct a.nik_user, date_format(a.tanggal, '%d-%m-%Y') as tgl "+
						" , a.nik_buat, date_format(b.tanggal,'%d-%m-%Y') as tgl1 "+
						" , nvl(b.nik_review,a.nik_review) as nik_review, date_format(c.tanggal,'%d-%m-%Y') as tgl2 "+
						" , nvl(b.nik_apppdrk3,a.nik_apppdrk3) as nik_apppdrk3, date_format(d.tanggal, '%d-%m-%Y') as tgl3 "+
						" , nvl(b.nik_apppdrk32,a.nik_apppdrk32) as nik_apppdrk32, date_format(dd.tanggal, '%d-%m-%Y') as tgl32 "+
						
						" , e.nik_user as fc1, date_format(e.tanggal, '%d-%m-%Y') as tgl4 "+
						" , f.nik_user as fc2, date_format(f.tanggal, '%d-%m-%Y') as tgl5 "+
						" , g.nik_user as fc3, date_format(g.tanggal, '%d-%m-%Y') as tgl6 "+
						" , h.nik_user as fc4, date_format(h.tanggal, '%d-%m-%Y') as tgl7 "+
						" , o.nik_user as fc5, date_format(o.tanggal, '%d-%m-%Y') as tgl15 "+
						
						" , i.nik_user as gr1, date_format(i.tanggal, '%d-%m-%Y') as tgl8 "+
						" , j.nik_user as gr2, date_format(j.tanggal, '%d-%m-%Y') as tgl9 "+
						" , k.nik_user as ma1, date_format(k.tanggal, '%d-%m-%Y') as tgl10 "+
						" , l.nik_user as ma2, date_format(l.tanggal, '%d-%m-%Y') as tgl11 "+
						" , m.nik_buat as su1, date_format(m.tanggal, '%d-%m-%Y') as tgl12 "+
						" , a.nik_review as su2, date_format(m.tanggal, '%d-%m-%Y') as tgl13 "+
						" , a.nik_app3 as su3, date_format(n.tanggal, '%d-%m-%Y') as tgl14 "+
						
						" , a.progress, b.progress as prog_rev, i.progress as prog_grev, k.progress as prog_mrev, g.progress as prog_frev "+						
						
						" from rra_pdrk_m a "+
						"	left outer join rra_rev_m b on b.no_pdrk = a.no_pdrk and b.kode_lokasi = a.kode_lokasi "+
						"	left outer join (select distinct z.catatan as no_pdrk, x.tanggal, x.nik_app, x.kode_lokasi from rra_app_m x inner join rra_app_d z on z.no_app = x.no_app and z.kode_lokasi = x.kode_lokasi where x.no_app like 'APP%') c on c.no_pdrk = a.no_pdrk and c.kode_lokasi = a.kode_lokasi and c.nik_app = nvl(b.nik_review,a.nik_review) "+
						"	left outer join (select distinct z.catatan as no_pdrk, x.tanggal, x.nik_app, x.kode_lokasi from rra_app_m x inner join rra_app_d z on z.no_app = x.no_app and z.kode_lokasi = x.kode_lokasi where x.no_app like 'APP%') d on d.no_pdrk = a.no_pdrk and d.kode_lokasi = a.kode_lokasi and d.nik_app = nvl(b.nik_apppdrk3,a.nik_apppdrk3) "+
						"	left outer join (select distinct z.catatan as no_pdrk, x.tanggal, x.nik_app, x.kode_lokasi from rra_app_m x inner join rra_app_d z on z.no_app = x.no_app and z.kode_lokasi = x.kode_lokasi where x.no_app like 'APP%') dd on dd.no_pdrk = a.no_pdrk and d.kode_lokasi = a.kode_lokasi and dd.nik_app = nvl(b.nik_apppdrk32,a.nik_apppdrk32) "+
						
						"	left outer join (select distinct z.catatan as no_pdrk, x.tanggal, x.nik_user, x.kode_lokasi from rra_app_m x inner join rra_app_d z on z.no_app = x.no_app and z.kode_lokasi = x.kode_lokasi where x.no_app like 'FCRK%') e on e.no_pdrk = a.no_pdrk and e.kode_lokasi = a.kode_lokasi "+
						"	left outer join (select distinct z.catatan as no_pdrk, x.tanggal, x.nik_user, x.kode_lokasi from rra_app_m x inner join rra_app_d z on z.no_app = x.no_app and z.kode_lokasi = x.kode_lokasi where x.no_app like 'FCKEP%') f on f.no_pdrk = a.no_pdrk and f.kode_lokasi = a.kode_lokasi "+
						"	left outer join rra_frev_m g on g.no_pdrk = a.no_pdrk and g.kode_lokasi = a.kode_lokasi and g.no_frev like 'FREV%' "+
						"	left outer join (select distinct z.catatan as no_pdrk, x.tanggal, x.nik_user, x.kode_lokasi from rra_app_m x inner join rra_app_d z on z.no_app = x.no_app and z.kode_lokasi = x.kode_lokasi where x.no_app like 'APPFC%') h on h.no_pdrk = a.no_pdrk and h.kode_lokasi = a.kode_lokasi "+
						"	left outer join (select distinct z.catatan as no_pdrk, x.tanggal, x.nik_user, x.kode_lokasi from rra_app_m x inner join rra_app_d z on z.no_app = x.no_app and z.kode_lokasi = x.kode_lokasi where x.no_app like 'FCTRN%') o on o.no_pdrk = a.no_pdrk and o.kode_lokasi = a.kode_lokasi "+
						
						"	left outer join rra_grev_m i on i.no_pdrk = a.no_pdrk and i.kode_lokasi = a.kode_lokasi "+
						"	left outer join (select distinct z.catatan as no_pdrk, x.tanggal, x.nik_user, x.kode_lokasi from rra_app_m x inner join rra_app_d z on z.no_app = x.no_app and z.kode_lokasi = x.kode_lokasi where x.no_app like 'GAPP%') j on j.no_pdrk = a.no_pdrk and j.kode_lokasi = a.kode_lokasi "+
						
						"	left outer join rra_mrev_m k on k.no_pdrk = a.no_pdrk and k.kode_lokasi = a.kode_lokasi "+
						"	left outer join (select distinct z.catatan as no_pdrk, x.tanggal, x.nik_user, x.kode_lokasi from rra_app_m x inner join rra_app_d z on z.no_app = x.no_app and z.kode_lokasi = x.kode_lokasi where x.no_app like 'MAPP%') l on l.no_pdrk = a.no_pdrk and l.kode_lokasi = a.kode_lokasi "+
						
						"	left outer join rra_sukka m on m.no_pdrk = a.no_pdrk and m.kode_lokasi = a.kode_lokasi "+						
						"	left outer join (select distinct z.catatan as no_pdrk, x.tanggal, x.nik_user, x.kode_lokasi from rra_app_m x inner join rra_app_d z on z.no_app = x.no_app and z.kode_lokasi = x.kode_lokasi where x.no_app like 'APPSK%') n on n.no_pdrk = a.no_pdrk and n.kode_lokasi = a.kode_lokasi "+
						
						" where a.no_pdrk = '"+sender.cells(16, row) +"' and a.kode_lokasi = '"+this.app._lokasi+"' ");
				var data = this.dbLib.getMultiDataProvider(sql,true);
				//eval("data = "+data+";");						
				this.standarLib.clearByTag(this, ["1"],undefined);		
				if (typeof data != "String"){
					
					var tmp = data.result[0];					
					if (tmp.rs.rows[0] != undefined){
						var page = this.p1mp.childPage[2];
						page.no_rev.setText(tmp.rs.rows[0].no_rev);						
						page.ubis.setText(tmp.rs.rows[0].ubis);
						page.tgl.setText(tmp.rs.rows[0].tgl);
						page.ket.setText(tmp.rs.rows[0].keterangan);
						page.nilai.setText(floatToNilai(tmp.rs.rows[0].nilai));
						page.nd.setText(tmp.rs.rows[0].no_nd);
						page.filend.setText(tmp.rs.rows[0].file_nd);
						page.jenis.setText(tmp.rs.rows[0].sts_pdrk);
						page.modul.setText(tmp.rs.rows[0].jenis_agg);
					}
					tmp = data.result[1];					
					if (tmp.rs.rows[0] != undefined){
						var page = this.p1mp.childPage[3];
						page.no_rev.setText(tmp.rs.rows[0].no_grev);						
						page.ubis.setText(tmp.rs.rows[0].gubis);
						page.tgl.setText(tmp.rs.rows[0].tgl);
						page.ket.setText(tmp.rs.rows[0].keterangan);
						page.nilai.setText(floatToNilai(tmp.rs.rows[0].nilai));
						page.nd.setText(tmp.rs.rows[0].no_nd);
						page.filend.setText(tmp.rs.rows[0].file_nd);
						page.jenis.setText(tmp.rs.rows[0].sts_pdrk);
						page.modul.setText(tmp.rs.rows[0].jenis_agg);
					}
					tmp = data.result[2];					
					if (tmp.rs.rows[0] != undefined){
						var page = this.p1mp.childPage[4];
						page.no_rev.setText(tmp.rs.rows[0].no_mrev);						
						page.ubis.setText(tmp.rs.rows[0].ubis);
						page.tgl.setText(tmp.rs.rows[0].tgl);
						page.ket.setText(tmp.rs.rows[0].keterangan);
						page.nilai.setText(floatToNilai(tmp.rs.rows[0].nilai));
						page.nd.setText(tmp.rs.rows[0].no_nd);
						page.filend.setText(tmp.rs.rows[0].file_nd);
						page.jenis.setText(tmp.rs.rows[0].sts_pdrk);
						page.modul.setText(tmp.rs.rows[0].jenis_agg);
					}
					tmp = data.result[3];
					if (tmp.rs.rows[0] != undefined){
						var page = this.p1mp.childPage[5];
						page.no_rev.setText(tmp.rs.rows[0].no_app);						
						page.ubis.setText(tmp.rs.rows[0].ubis);
						page.tgl.setText(tmp.rs.rows[0].tgl);
						page.ket.setText(tmp.rs.rows[0].keterangan);						
					}
					tmp = data.result[4];
					if (tmp.rs.rows[0] != undefined){
						var page = this.p1mp.childPage[6];
						page.no_rev.setText(tmp.rs.rows[0].no_sukka);						
						page.ubis.setText(tmp.rs.rows[0].ubis);
						page.tgl.setText(tmp.rs.rows[0].tgl);
						page.modul.setText(tmp.rs.rows[0].modul);						
						page.jenis.setText(tmp.rs.rows[0].sts_pdrk);						
					}
					tmp = data.result[5];
					this.p1mp.childPage[7].lPDRK.setCaption(" NO PDRK : " + sender.cells(16,row));
					if (tmp.rs.rows[0] != undefined){
						var page = this.p1mp.childPage[7];
						var line = tmp.rs.rows[0];
						page.p1.ePengaju.setText(line.nik_user);						
						page.p1.tPengaju.setText(line.tgl);						
						page.p1.eReview.setText(line.nik_buat);						
						page.p1.tReview.setText(line.tgl1);		
						page.p1.eApp1.setText(line.nik_review);						
						page.p1.tApp1.setText(line.tgl2);						
						page.p1.eApp2.setText(line.nik_apppdrk3);						
						page.p1.tApp2.setText(line.tgl3);							
						page.p1.eApp3.setText(line.nik_apppdrk32);						
						page.p1.tApp3.setText(line.tgl32);		
						
						page.p2.eReview.setText(line.fc1);						
						page.p2.tReview.setText(line.tgl4);		
						page.p2.eKeep.setText(line.fc2);						
						page.p2.tKeep.setText(line.tgl5);						
						page.p2.eReview2.setText(line.fc3);						
						page.p2.tReview2.setText(line.tgl6);		
						page.p2.eApp1.setText(line.fc4);						
						page.p2.tApp1.setText(line.tgl7);		
						page.p2.eSAP.setText(line.fc5);						
						page.p2.tSAP.setText(line.tgl15);		
						
						
						page.p3.eReview.setText(line.gr1);						
						page.p3.tReview.setText(line.tgl8);		
						page.p3.eApp1.setText(line.gr2);						
						page.p3.tApp1.setText(line.tgl9);						
						
						page.p4.eReview.setText(line.ma1);						
						page.p4.tReview.setText(line.tgl10);		
						page.p4.eApp1.setText(line.ma2);						
						page.p4.tApp1.setText(line.tgl11);		
						
						page.p5.ePengaju.setText(line.su1);						
						page.p5.tPengaju.setText(line.tgl12);		
						page.p5.eReview.setText(line.su2);						
						page.p5.tReview.setText(line.tgl13);		
						page.p5.eApp1.setText(line.su3);						
						page.p5.tApp1.setText(line.tgl14);		
					}
				}
			}

		}catch(e){
			alert(e);
		}
	},
	doSgClick:function(sender, col, row){				
	},
	mainButtonClik: function(sender){
	   if (sender == this.app._mainForm.bSimpan) system.confirm(this, "simpan", "Apa data sudah benar?","data di form ini akan di proses.");	
    },    
	doSelectFilterCell: function(sender, col, row){
		try{
			sender.columns.get(2).setReadOnly(false);
			sender.columns.get(2).setReadOnly(true);
			this.filterRep.setSGFilterRowTipe(sender, row,new Array(0,1,2,3,4,5),new  Array("123","123i","123","123","123","123"));			
			this.filterRep.setSGFilterRowButtonStyle(sender, row,new Array(0,1,2,3,4,5),new  Array(0,2,2,0,2,2));
			if (row == 0)
			{
			
				var rs = this.dbLib.runSQL("select distinct periode from rra_pdrk_m where kode_lokasi='"+this.app._lokasi+"' order by periode desc ");			
				if (rs instanceof arrayMap){
					sender.columns.get(2).pickList.clear();
					var ix=0;
					for (var i in rs.objList){								
						sender.columns.get(2).pickList.set(ix, rs.get(i).get("periode"));
						ix++;
					}
				}
			}
			
			if (row == 3){
				this.sg1mp.columns.get(2).pickList.clear();
				this.gridLib.SGIsiItemsFromArray(this.sg1mp.columns.get(2).pickList,["OPEX","CAPEX"]);
			}
		}catch(e){
			alert(e);
		}
		
	},
	doEllipsFilterClick: function(sender, col, row){
		if (row == 1)
		{
			this.filterRep.ListDataSGFilter(this, "Data UBIS",sender, sender.row, sender.col,
					"select distinct a.kode_ubis, a.nama from rra_ubis a where kode_lokasi = '"+this.app._lokasi+"'",
					"select count(*) from rra_ubis where kode_lokasi = '"+this.app._lokasi+"' ",
					["kode_ubis","nama"],"and",["Kode","Deskripsi"]);
		}	
		if (row == 2)
		{
			this.filterRep.ListDataSGFilter(this, "Data PDRK",sender, sender.row, sender.col,
					"select distinct no_pdrk, keterangan from rra_pdrk_m a "+					
					" where a.kode_lokasi = '"+this.app._lokasi+"'   "+
					this.filterRep.filterStr("a.kode_ubis",sender.cells(1,1),sender.cells(2,1),sender.cells(3,1),"and"),
					"select count(*) from rra_pdrk_m a "+	
					" where a.kode_lokasi = '"+this.app._lokasi+"' "+
					this.filterRep.filterStr("a.kode_ubis",sender.cells(1,1),sender.cells(2,1),sender.cells(3,1),"and")+ "  ",
					["no_pdrk","nama"],"and",["No PDRK","Descript"]);
		}				
	},
	doViewReport: function(no_bukti,jenis){		
		if (this.report == undefined)
			this.report = new server_report_report();
		var filter = "where a.no_pdrk = '"+no_bukti+"'";
		var filter2 = "/"+this.app._periode+"/"+jenis+"/"+this.app._kodeUbis+"/"+this.app._namaForm;									
		var url = [
			this.report.previewWithHeader("server_report_rra_rptPdrk1",filter, 1,  1, this.showFilter, this.app._namaLokasi,filter2),
			this.report.previewWithHeader("server_report_rra_rptPdrk2",filter, 1,  1, this.showFilter, this.app._namaLokasi,filter2),
			this.report.previewWithHeader("server_report_rra_rptPdrk3",filter, 1,  1, this.showFilter, this.app._namaLokasi,filter2),
			this.report.previewWithHeader("server_report_rra_rptSukka",filter, 1,  1, this.showFilter, this.app._namaLokasi,filter2)
			];
		this.viewer.previewMultiPage(url, true, ["PDRK-1","PDRK-2","PDRK-3","SUKKA"]);
		this.p1mp.setActivePage(this.p1mp.childPage[1]);
	}
});
