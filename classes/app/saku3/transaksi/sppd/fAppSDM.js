window.app_saku3_transaksi_sppd_fAppSDM = function(owner)
{
	if (owner)
	{		
		window.app_saku3_transaksi_sppd_fAppSDM.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_sppd_fAppSDM";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Verifikasi SPPD", 0);	
		
		uses("saiCB;saiMemo;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");				
		uses("saiCBBL",true);
		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]});		
		
		this.pc1 = new pageControl(this,{bound:[10,18,1000,410], childPage:["Surat Perintah","Daftar SPPD","Detail Bukti","Dokumen Upload","Filter Data"]});		
		this.sg4 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:7,tag:9,
					colTitle:["No SP","Tgl Mulai","Tgl Selesai","Maksud/Tujuan","Kota Asal","Kota Tujuan",""],
					colWidth:[[6,5,4,3,2,1,0],[80,120,120,300,80,80,150]],
					colFormat:[[6],[cfButton]],click:[this,"doSgBtnClick4"], colAlign:[[6],[alCenter]],						
					readOnly:true,										
					dblClick:[this,"doDoubleClick4"],autoAppend:false,defaultRow:1});		
		this.sgn4 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg4});

		this.sg = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:13,tag:0,
		            colTitle:["No PD","Status","NIP Pegawai","Tgl Mulai","Tgl Selesai","Maksud/Tujuan","PP Perintah","Tempat","No Approve","Tgl Input","Kode PP","NIP App2",""],
					colWidth:[[12,11,10,9,8,7,6,5,4,3,2,1,0],[80,80,80,110,100,200,150,220,75,75,200,70,100]],
					colHide:[[7,8,9,  10,11],[true,true,true,true,true]],					
					readOnly:true,
					colFormat:[[12],[cfButton]],click:[this,"doSgBtnClick"], colAlign:[[12],[alCenter]],						
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});
				
		this.c_status = new saiCB(this.pc1.childPage[2],{bound:[420,24,200,20],caption:"Status",items:["APPROVE","REJECT"], readOnly:true,tag:0, visible:false}); //RETURN --> tidak boleh , ke kunci saat bundle

		this.lstatus = new portalui_label(this.pc1.childPage[2],{bound:[20,24,100,18],caption:"Status Approval",underline:true});
		this.rb1 = new portalui_radioButton(this.pc1.childPage[2],{bound:[130,24,100,20],caption:"Approve", change:[this,"doRadioSelected"]});
		this.rb3 = new portalui_radioButton(this.pc1.childPage[2],{bound:[230,24,100,20],caption:"Reject",selected:true, change:[this,"doRadioSelected"]});

		this.e_nb = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,10,200,20],caption:"No App", readOnly:true,visible:false});						
		this.e_memo = new saiMemo(this.pc1.childPage[2],{bound:[20,10,550,60],caption:"Catatan",tag:9,readOnly:true});				
		
		this.pc2 = new pageControl(this.pc1.childPage[2],{bound:[1,12,995,290], childPage:["Data PD","Transport","Uang Harian"]});		
		this.e_nobukti = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"No PD", readOnly:true});		
		this.e_bidang = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,13,450,20],caption:"PP Perintah", readOnly:true});				
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,450,20],caption:"Maksud / Tujuan", readOnly:true});					
		this.e_asal = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,450,20],caption:"Kota Asal", readOnly:true});				
		this.e_tempat = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,15,450,20],caption:"Kota Tujuan", readOnly:true});				
		this.e_nik = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,450,20],caption:"NIP Pegawai", readOnly:true});
		this.e_jab1 = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,19,200,20],caption:"Jabatan 1", readOnly:true});	
		this.e_jab2 = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,11,200,20],caption:"Jabatan 2", readOnly:true});	
		this.e_nilaiut = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"Total Transport", tag:1, readOnly:true, tipeText:ttNilai, text:"0",change:[this,"doChange"]});	
		this.e_nilaiuh = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,13,200,20],caption:"Total U. Harian", tag:1, readOnly:true, tipeText:ttNilai, text:"0",change:[this,"doChange"]});	
		this.e_total = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,14,200,20],caption:"Total SPPD", tag:1, readOnly:true, tipeText:ttNilai, text:"0",change:[this,"doChange"]});	
		
		this.sg5 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:9,tag:9,		            
			colTitle:["Kode Jns","Jenis Angkutan","Kode Rute","Nama","Tempat Asal","Tempat Tujuan","Tarif","Jumlah","Nilai"],
			colWidth:[[8,7,6,5,4,3,2,1,0],[80,80,80,160,160,170,70,80,60]],
			columnReadOnly:[true,[0,1,2,3,4,5,8],6,[7]],
			buttonStyle:[[0,2],[bsEllips,bsEllips]], 
			colFormat:[[6,7,8],[cfNilai,cfNilai,cfNilai]],
			defaultRow:1,
			ellipsClick:[this,"doEllipsClick5"],change:[this,"doChangeCell5"],nilaiChange:[this,"doNilaiChange5"],autoAppend:true});
		this.sgn5 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[0,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:2,grid:this.sg5});

		this.sg2 = new saiGrid(this.pc2.childPage[2],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:8,tag:0,
			colTitle:["Kd Jenis","Jenis SPPD","Tanggal Berangkat","Tanggal Tiba","Lama Hari","Tarif","Persen","Nilai"],
			colWidth:[[7,6,5,4,3,2,1,0],[100,80,100,120,120,120,200,80]],
			columnReadOnly:[true,[0,1,4,7,2,3,6],[5]],
			colFormat:[[2,3,4,5,6,7],[cfDate,cfDate,cfNilai,cfNilai,cfNilai,cfNilai]],
			buttonStyle:[[0,2,3,6],[bsEllips,bsDate,bsDate,bsAuto]], 	
			picklist:[[6],[new portalui_arrayMap({items:["150","100","50","40"]})]], 									
			defaultRow:1,
			ellipsClick:[this,"doEllipsClick2"],change:[this,"doChangeCell2"],nilaiChange:[this,"doNilaiChange2"],autoAppend:true});
		this.sgn2 = new portalui_sgNavigator(this.pc2.childPage[2],{bound:[0,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:2,grid:this.sg2});										

	
		this.e_file = new saiLabelEdit(this.pc1.childPage[3],{bound:[20,15,450,20],caption:"Memo/Surat Tugas", readOnly:true, tag:9});		
		this.bLihat = new button(this.pc1.childPage[3],{bound:[480,15,80,18],caption:"Lihat File",click:[this,"doLihat"]});					
		this.e_file2 = new saiLabelEdit(this.pc1.childPage[3],{bound:[20,16,450,20],caption:"Lamp Pendukung", readOnly:true, tag:9});		
		this.bLihat2 = new button(this.pc1.childPage[3],{bound:[480,16,80,18],caption:"Lihat File",click:[this,"doLihat"]});					
		this.e_file3 = new saiLabelEdit(this.pc1.childPage[3],{bound:[20,17,450,20],caption:"Lamp Pendukung", readOnly:true, tag:9});		
		this.bLihat3 = new button(this.pc1.childPage[3],{bound:[480,17,80,18],caption:"Lihat File",click:[this,"doLihat"]});					
		this.e_file4 = new saiLabelEdit(this.pc1.childPage[3],{bound:[20,18,450,20],caption:"Lamp Pendukung", readOnly:true, tag:9});		
		this.bLihat4 = new button(this.pc1.childPage[3],{bound:[480,18,80,18],caption:"Lihat File",click:[this,"doLihat"]});					
		this.e_file5 = new saiLabelEdit(this.pc1.childPage[3],{bound:[20,19,450,20],caption:"Lamp Pendukung", readOnly:true, tag:9});		
		this.bLihat5 = new button(this.pc1.childPage[3],{bound:[480,19,80,18],caption:"Lihat File",click:[this,"doLihat"]});				
		
		this.cb_nb = new saiCBBL(this.pc1.childPage[4],{bound:[20,12,220,20],caption:"No PD", multiSelection:false, maxLength:10, tag:9,change:[this,"doChange"]});
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[2].rearrangeChild(10, 23);	
		this.pc1.childPage[3].rearrangeChild(10, 23);	
		this.pc1.childPage[3].rearrangeChild(10, 23);	
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		
		setTipeButton(tbAllFalse);				
		this.setTabChildIndex();		
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);


		this.rootDir = this.app._rootDir;
		this.fileUtil = new util_file();
		this.fileUtil.addListener(this);
	
		
		try {			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();								
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);									
			this.c_status.setText("");

			this.rb1.setSelected(true);					
			this.rb3.setSelected(false);					
		}catch(e){
			systemAPI.alert(e);
		}		
	}
};
window.app_saku3_transaksi_sppd_fAppSDM.extend(window.childForm);
window.app_saku3_transaksi_sppd_fAppSDM.implement({	
	doSgBtnClick4: function(sender, col, row){
		try{
			if (col === 6)
				{
					this.doDoubleClick4(this.sg,6,row);					
				}
		}catch(e){
			alert(e);
		}
	},
	doSgBtnClick: function(sender, col, row){
		try{
			if (col === 12)
				{
					this.doDoubleClick(this.sg,12,row);					
				}
		}catch(e){
			alert(e);
		}
	},
	doRadioSelected: function(sender,selected){                     
		if (this.rb1.isSelected()) this.c_status.setText("APPROVE");
		if (this.rb3.isSelected()) this.c_status.setText("REJECT");
    },
	doLihat: function(sender){
		try{
			if (sender == this.bLihat) {
				if (this.e_file.getText() != "" || this.e_file.getText() != "-") window.open("server/media/"+this.e_file.getText());
			}
			if (sender == this.bLihat2) {
				if (this.e_file2.getText() != "" || this.e_file2.getText() != "-") window.open("server/media/"+this.e_file2.getText());
			}			
			if (sender == this.bLihat3) {
				if (this.e_file3.getText() != "" || this.e_file3.getText() != "-") window.open("server/media/"+this.e_file3.getText());
			}
			if (sender == this.bLihat4) {
				if (this.e_file4.getText() != "" || this.e_file4.getText() != "-") window.open("server/media/"+this.e_file4.getText());
			}
			if (sender == this.bLihat5) {
				if (this.e_file5.getText() != "" || this.e_file5.getText() != "-") window.open("server/media/"+this.e_file5.getText());
			}
		}catch(e){
			alert(e);
		}
	},
	doLoadSP : function() {		
		var strSQL = "select a.no_perintah,convert(varchar,a.tgl_mulai,103) as tglawal,convert(varchar,a.tgl_selesai,103) as tglakhir,a.keterangan,c.nama as asal,d.nama as tujuan "+
					 "from sp_perintah_m a "+
					 "	inner join ( "+
					 "			select distinct no_perintah "+
					 "			from sp_spj_m "+
					 "  		where kode_lokasi='"+this.app._lokasi+"' and no_stugas='-' and progress='2' "+
					 "			  ) b on a.no_perintah=b.no_perintah "+
					 "	inner join sp_kota c on a.asal=c.kode_kota "+
					 "	inner join sp_kota d on a.tempat=d.kode_kota "+
					 "  left join ( "+
					 "			select distinct no_perintah from sp_stugas_m where kode_lokasi='"+this.app._lokasi+"' " +	
					 "	) e on a.no_perintah=e.no_perintah "+
					 "where a.no_batch<>'-' and a.kode_lokasi='"+this.app._lokasi+"' and e.no_perintah is null";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg4.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];												
				this.sg4.appendData([line.no_perintah,line.tglawal,line.tglakhir,line.keterangan,line.asal,line.tujuan,"Detail"]);
			}
		} else this.sg4.clear(1);
	},
	doDoubleClick4: function(sender, col , row) {
		this.noPerintah = this.sg4.cells(0,row);
		this.doLoad();
	},
	doEllipsClick5: function(sender, col, row) {
		try{
			switch(col){
				case 0 :
							this.standarLib.showListDataForSG(this, "Daftar Jenis Angkutan",this.sg5, this.sg5.row, this.sg5.col, 
														"select kode_jenis,nama from sp_jenis where kode_lokasi='"+this.app._lokasi+"'",
														"select count(kode_jenis) from sp_jenis where kode_lokasi='"+this.app._lokasi+"'",
														 new Array("kode_jenis","nama"),"and",new Array("Kode","Jenis"),false);					
						break;					
				case 2 :
							this.standarLib.showListDataForSG(this, "Daftar Rute",this.sg5, this.sg5.row, this.sg5.col, 
														"select kode_trans, nama from sp_trans where kode_jenis = '"+this.sg5.cells(0,row)+"' and flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"' ",
														"select count(kode_trans) from sp_trans where kode_jenis = '"+this.sg5.cells(0,row)+"' and flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"' ",
														 new Array("kode_trans","nama"),"and",new Array("Kode","Nama"),false);					
						break;					
			}						
		}catch(e)
		{
			systemAPI.alert("[app_saku_gl_transaksi_fJu2] : doFindBtnClick : " + e);
		}
	},	
	doChangeCell5: function(sender, col, row) {
		if (col == 0 && this.sg5.cells(0,row) != "") {			
			this.sg5.cells(2,row,"");
			this.sg5.cells(3,row,"");
			this.sg5.cells(4,row,"");				
			this.sg5.cells(5,row,"");				
			this.sg5.cells(6,row,"0");			
			this.sg5.cells(8,row,"0");
		}

		if (col == 2 && this.sg5.cells(2,row) != "") {
			var data = this.dbLib.getDataProvider("select tarif,asal,tujuan from sp_trans "+
						"where kode_jenis = '"+this.sg5.cells(0,row)+"' and kode_trans='"+this.sg5.cells(2,row)+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];																			
				this.sg5.cells(4,row,line.asal);
				this.sg5.cells(5,row,line.tujuan);								
				this.sg5.cells(6,row,floatToNilai(line.tarif));

				if (this.sg5.cells(6,row) != "" && this.sg5.cells(7,row) != "") {				
					this.sg5.setCell(8,row,floatToNilai(nilaiToFloat(this.sg5.cells(6,row)) * nilaiToFloat(this.sg5.cells(7,row))));				
				}				
			}
			this.sg5.validasi();
		}

		if (col == 7 || col == 6 ) {
			if (this.sg5.cells(6,row) != "" && this.sg5.cells(7,row) != "") {
				this.sg5.setCell(8,row,floatToNilai(nilaiToFloat(this.sg5.cells(6,row)) * nilaiToFloat(this.sg5.cells(7,row))));
				this.sg5.validasi();
			}
		}		
	},
	doNilaiChange5: function(){
		try{
			var tot = 0;
			for (var i = 0; i < this.sg5.rows.getLength();i++){
				if (this.sg5.rowValid(i) && this.sg5.getCell(8,i) != ""){
					tot += nilaiToFloat(this.sg5.getCell(8,i));			
				}
			}
			this.e_nilaiut.setText(floatToNilai(tot));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},	
	mainButtonClick: function(sender){
		if (sender == this.app._mainForm.bClear)
			system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");	
		if (sender == this.app._mainForm.bSimpan)
			system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");	
		if (sender == this.app._mainForm.bEdit)
			system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");	
		if (sender == this.app._mainForm.bHapus)
			system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");			
	},
	simpan: function(){			
		try{														
			this.doClick();
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();																								
					if (this.c_status.getText() == "APPROVE") var vStatus = "3"; 
					//if (this.c_status.getText() == "RETURN") var vStatus = "S"; 
					if (this.c_status.getText() == "REJECT") var vStatus = "W"; 
					
					sql.add("update sp_spj_m set nilai_uhar="+nilaiToFloat(this.e_nilaiuh.getText())+", nilai_trans="+nilaiToFloat(this.e_nilaiut.getText())+" where no_spj = '"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					sql.add("delete from sp_spj_dt where no_spj = '"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					sql.add("delete from sp_spj_dh where no_spj = '"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					
					if (this.sg5.getRowValidCount() > 0){
						for (var i=0;i < this.sg5.getRowCount();i++){
							if (this.sg5.rowValid(i)){
								sql.add("insert into sp_spj_dt(no_spj,kode_lokasi,no_urut,kode_trans,asal,tujuan,kode_jenis,nilai,jumlah,tarif) values "+
										"	('"+this.e_nobukti.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sg5.cells(2,i)+"','"+this.sg5.cells(4,i)+"','"+this.sg5.cells(5,i)+"','"+this.sg5.cells(0,i)+"',"+parseNilai(this.sg5.cells(8,i))+","+parseNilai(this.sg5.cells(7,i))+","+parseNilai(this.sg5.cells(6,i))+")");
							}
						}
					}
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){
								sql.add("insert into sp_spj_dh(no_spj,kode_lokasi,no_urut,sts_spj,tgl_mulai,tgl_selesai,lama,tarif,persen,nilai) values "+
										"	('"+this.e_nobukti.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sg2.cells(0,i)+"','"+this.sg2.getCellDateValue(2,i)+"','"+this.sg2.getCellDateValue(3,i)+"',"+parseNilai(this.sg2.cells(4,i))+","+parseNilai(this.sg2.cells(5,i))+","+parseNilai(this.sg2.cells(6,i))+","+parseNilai(this.sg2.cells(7,i))+")");
							}
						}
					}
					
					sql.add("update sp_spj_app_m set no_flag='"+this.e_nb.getText()+"' where no_bukti='"+this.e_nobukti.getText()+"' and no_flag='-' and form='APPATS' and modul='PDSS'");					
					sql.add("insert into sp_spj_app_m (no_app,kode_lokasi,tanggal,periode,tgl_input,nik_user,status,modul,form,no_bukti,catatan,no_flag,nik_bdh,nik_fiat) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.e_periode.getText()+"',getdate(),'"+this.app._userLog+"','"+vStatus+"','PDSS','APPSDM','"+this.e_nobukti.getText()+"','"+this.e_memo.getText()+"','-','X','X')");
																				
					//---------------- flag bukti					
					sql.add("update sp_spj_m set no_appsdm='"+this.e_nb.getText()+"',progress='"+vStatus+"' where no_spj='"+this.e_nobukti.getText()+"'");					
					
					/*
					//---------------- approve mobile
					if (vStatus == "1") {
						sql.add("insert into pushmessage(  nik, pesan, status, tgl_input, token, os, appid) values "+
								"('"+this.nik_push+"','"+this.e_memo.getText()+"','1',getdate(),'-','-','SPJ')");
						
						//utk yg loncat langsung ke nik app2
						if (this.nikApp1 == "-") {
							sql.add("delete from sp_spj_app_m where no_app='"+this.e_nobukti.getText()+"' and form='APPATS' and modul='PDSS' and kode_lokasi='"+this.app._lokasi+"'");						
							sql.add("insert into sp_spj_app_m (no_app,kode_lokasi,tanggal,periode,tgl_input,nik_user,status,modul,form,no_bukti,catatan,no_flag,nik_bdh,nik_fiat) values "+
									"('"+this.e_nobukti.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.e_periode.getText()+"',getdate(),'"+this.app._userLog+"','2','PDSS','APPATS','"+this.e_nobukti.getText()+"','-','-','X','X')");
							
							sql.add("update sp_spj_m set no_app1='"+this.e_nobukti.getText()+"',progress='2' where no_spj='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						}		
					}
					*/

					setTipeButton(tbAllFalse);					
					this.dbLib.execArraySQL(sql);						
					this.pc1.setActivePage(this.pc1.childPage[0]);			
				}
				catch(e){
					system.alert(this, e,"");
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);
					this.doClick();													
					this.pc1.setActivePage(this.pc1.childPage[0]);	
					this.e_memo.setText("");
					setTipeButton(tbAllFalse);	
					this.doLoadSP();				
				break;
			case "simpan" :	
				
			case "ubah" :					
				this.preView = "1";				
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);																				
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}
				if (parseFloat(this.app._periode) < parseFloat(this.e_periode.getText())){
					if (this.app._pernext == "1")
					  system.confirm(this, "simpancek", "Periode transaksi melebihi periode aktif sistem.["+this.app._periode+"]","Data akan disimpan?");
					else{
						system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh melebihi periode aktif sistem.["+this.app._periode+"]");
						return false;
					}
				} 
				else 
				this.simpan();				
				break;				
				
			case "simpancek" : this.simpan();			
				break;
				
			case "hapus" :	
				this.preView = "0";
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();									
				sql.add("delete from sp_spj_app_m where no_app='"+this.noAppLama+"' and kode_lokasi='"+this.app._lokasi+"'");	
				sql.add("update sp_spj_m set no_appsdm='-',progress='2' where no_spj='"+this.e_nobukti.getText()+"' ");	
				setTipeButton(tbAllFalse);					
				this.dbLib.execArraySQL(sql);				
				break;					
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else {
			if (m == "12") this.e_periode.setText(this.app._periode);
			else this.e_periode.setText(y+""+m);
		}
		this.cb_nb.setSQL("select distinct a.no_spj as no_bukti, b.keterangan, a.nik_spj, a.nama_spj "+
						  "from sp_spj_m a "+
						  "		inner join sp_perintah_m b on a. no_perintah = b.no_perintah and a.kode_lokasi=b.kode_lokasi and b.no_batch<>'-' "+						  						  
						  "where a.kode_lokasi='"+this.app._lokasi+"' and "+
						  " a.progress in ('3','S') and a.no_stugas='-'  ",["no_bukti","keterangan","nik_spj","nama_spj"],false,["No PD","Deskripsi","NIP","Nama SPJ"],"and","Daftar Bukti",true);	

		if (this.stsSimpan == 1) {
			this.doClick();		
			this.doLoadSP();
		}
	},	
	doChange:function(sender){				
		if (sender == this.cb_nb && this.cb_nb.getText() != "") {
			this.pc1.setActivePage(this.pc1.childPage[1]);		
			var strSQL = "select a.progress,a.no_spj as no_bukti,case a.progress when '3' then 'APPROVE' when 'W' then 'REJECT' end as status,"+
						"convert(varchar,d.tgl_mulai,103) as tglawal, convert(varchar,d.tgl_selesai,103) as tglakhir, c.kode_pp+' - '+c.nama as pp,b.keterangan,a.tempat, "+
						"a.nik_spj+' - '+a.nama_spj as nik,a.no_app1,convert(varchar,a.tgl_input,120) as tglinput, "+
						"a.kode_pp,  case when a.nik_app1 = '-' then a.nik_app2 else a.nik_app1 end as nik_app2, a.no_perintah  "+
						"from sp_spj_m a "+
						"inner join sp_perintah_m b on a.no_perintah = b.no_perintah and a.kode_lokasi=b.kode_lokasi and b.no_batch<>'-' "+
						"inner join pp c on b.kode_pp=c.kode_pp and b.kode_lokasi=c.kode_lokasi "+	
						
						"inner join ( "+							
						"	select no_spj,min(tgl_mulai) as tgl_mulai,max(tgl_selesai) as tgl_selesai "+
						"	from sp_spj_dh "+
						"	where kode_lokasi='"+this.app._lokasi+"' group by no_spj "+						
						") d on a.no_spj=d.no_spj "+

						"where a.no_spj='"+this.cb_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ";

			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.noPerintah = data.rs.rows[0].no_perintah;
				
				var strSQL = "select a.no_perintah,convert(varchar,a.tgl_mulai,103) as tglawal,convert(varchar,a.tgl_selesai,103) as tglakhir,a.keterangan,c.nama as asal,d.nama as tujuan "+
							"from sp_perintah_m a "+
							"inner join sp_kota c on a.asal=c.kode_kota "+
							"inner join sp_kota d on a.tempat=d.kode_kota "+
							"where a.no_perintah='"+this.noPerintah+"' and a.kode_lokasi='"+this.app._lokasi+"'";
				var data2 = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data2 == "object" && data2.rs.rows[0] != undefined){
					var line;
					this.sg4.clear();
					for (var i in data2.rs.rows){
						line = data2.rs.rows[i];												
						this.sg4.appendData([line.no_perintah,line.tglawal,line.tglakhir,line.keterangan,line.asal,line.tujuan,"Detail"]);
					}
				} 

				this.dataJU = data;
				this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn.rearrange();
				this.doTampilData(1);
			} else this.sg.clear(1);				
		}
		if ((sender == this.e_nilaiut || sender == this.e_nilaiuh)  && this.e_nilaiut.getText()!="" && this.e_nilaiuh.getText()!="") {
			var tot = nilaiToFloat(this.e_nilaiut.getText()) + nilaiToFloat(this.e_nilaiuh.getText());
			this.e_total.setText(floatToNilai(tot));
		}
	},
	doClick:function(sender){		
		if (this.stsSimpan == 0) {			
			this.doLoadSP();
		}
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"sp_spj_app_m","no_app",this.app._lokasi+"-ATS"+this.e_periode.getText().substr(2,4)+".","0000"));												
		this.e_memo.setFocus();								
	},		
	doEllipsClick2: function(sender, col, row) {
		try{
			switch(col){
				case 0 :
							this.standarLib.showListDataForSG(this, "Daftar Jenis SPPD",this.sg2, this.sg2.row, this.sg2.col, 
														"select sts_spj, nama  from sp_status where kode_lokasi='"+this.app._lokasi+"' and flag_aktif='1'",
														"select count(sts_spj) from sp_status where kode_lokasi='"+this.app._lokasi+"' and flag_aktif='1'",									
														 new Array("sts_spj","nama"),"and",new Array("Kode","Jenis"),false);					
						break;					
			}						
		}catch(e)
		{
			systemAPI.alert("[app_saku_gl_transaksi_fJu2] : doFindBtnClick : " + e);
		}
	},
	doChangeCell2: function(sender, col, row) {
		if (col == 2 || col == 3 || col == 0) {			 
			if ( this.e_jab1.getText() != "" || this.e_jab2.getText() != "") {
				if (col == 0) {
					var data = this.dbLib.getDataProvider("select max(nilai) as nilai from sp_uhar where kode_jab in ('"+this.jab1+"','"+this.jab2+"') and sts_spj = '"+this.sg2.cells(0,row)+"' and kode_lokasi='"+this.app._lokasi+"'",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){
							this.nilai_uh = parseFloat(line.nilai);							
							this.sg2.setCell(5,row,floatToNilai(line.nilai));							
						}
						else {
							system.alert(this,"Transaksi tidak valid.","Tarif Uang Harian Band/Grade tidak ditemukan.");
							return false;
						}
					}
				}

				if (this.sg2.cells(2,row) == "" || this.sg2.cells(3,row) == "") this.sg2.cells(4,row,"0");
				else {				
					var d = new Date();
					var d1 =  d.strToDate(this.sg2.cells(2, row));
					var d2 = d.strToDate(this.sg2.cells(3, row));
					var jumlah = d2.DateDiff(d1) + 1;
					if (parseFloat(jumlah) > 0) this.sg2.cells(4,row,floatToNilai(jumlah));
					else this.sg2.cells(4,row,"0");				
				}
			}
			else {
				system.alert(this,"Transaksi tidak valid.","Harap pilih NIK SPPD terlebih dahulu.");
				return false;
			}	
		}		
		
		if ((col == 4 || col == 5 || col == 6) && this.sg2.cells(4,row)!="" && this.sg2.cells(5,row)!="" && this.sg2.cells(6,row)!="") {			
			this.sg2.setCell(7,row,floatToNilai( Math.round(nilaiToFloat(this.sg2.cells(5,row)) * nilaiToFloat(this.sg2.cells(4,row)) * nilaiToFloat(this.sg2.cells(6,row))/100 )));
		}		
		this.sg2.validasi();
	},	
	doNilaiChange2: function(){
		try{
			var tot = 0;
			for (var i = 0; i < this.sg2.rows.getLength();i++){
				if (this.sg2.rowValid(i) && this.sg2.getCell(7,i) != ""){
					tot += nilaiToFloat(this.sg2.getCell(7,i));			
				}
			}
			this.e_nilaiuh.setText(floatToNilai(tot));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg.cells(0,row) != "") {			
				this.pc1.setActivePage(this.pc1.childPage[2]);	

				/*
				if (this.sg.cells(1,row) == "REJECT") {
					this.c_status.setText(this.sg.cells(1,row));								
				}
				else {
					this.c_status.setText("");								
				}
				*/

				if (this.sg.cells(1,row) == "APPROVE") this.rb1.setSelected(true);									
				if (this.sg.cells(1,row) == "REJECT") this.rb3.setSelected(true);	

				if (this.sg.cells(1,row) == "INPROG") {
					this.rb1.setSelected(false);					
					this.rb3.setSelected(false);	
					
					this.c_status.setText("");
				}

				this.e_nobukti.setText(this.sg.cells(0,row));												
				this.e_bidang.setText(this.sg.cells(6,row));
				this.e_ket.setText(this.sg.cells(5,row));
				this.e_tempat.setText(this.sg.cells(7,row));				
				this.e_nik.setText(this.sg.cells(2,row));										
				
				this.noAppLama = this.sg.cells(8,row);						
				this.kodePPBukti = this.sg.cells(10,row);
				this.e_memo.setText(this.sg.cells(5,row));								
				this.nik_push=this.sg.cells(11,row);

				
				var data2 = this.dbLib.getDataProvider(
							"select a.nik_app1, a.kode_jab,a.kode_jab2, isnull(b.nama,'-') as jab1,isnull(c.nama,'-') as jab2, a.asal "+
							"from sp_spj_m a "+
							"	  left join sp_jab b on a.kode_jab=b.kode_jab and a.kode_lokasi=b.kode_lokasi "+
							"	  left join sp_jab c on a.kode_jab2=c.kode_jab and a.kode_lokasi=c.kode_lokasi "+
							"where a.no_spj='"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data2 == "object" && data2.rs.rows[0] != undefined){
					var line2 = data2.rs.rows[0];												 
					
					this.e_asal.setText(line2.asal);

					this.e_jab1.setText(line2.jab1);	
					this.e_jab2.setText(line2.jab2);	
					this.nikApp1 = line2.nik_app1;		
					
					this.jab1 = line2.kode_jab;					
					this.jab2 = line2.kode_jab2;
				} 
				
				var strSQL = "select a.kode_trans,a.asal+'-'+a.tujuan as nama,a.nilai,a.asal,a.tujuan,a.kode_jenis,a.tarif,a.jumlah,b.nama as nama_jenis "+
							 "from sp_spj_dt a inner join sp_jenis b on a.kode_jenis=b.kode_jenis  "+
							 "where a.no_spj='"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){				
					var line;
					this.sg5.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg5.appendData([line.kode_jenis,line.nama_jenis,line.kode_trans,line.nama,line.asal,line.tujuan,floatToNilai(line.tarif),floatToNilai(line.jumlah),floatToNilai(line.nilai)]);
					}
				} else this.sg5.clear(1);			
				this.sg5.validasi();			

				var strSQL = "select a.sts_spj,b.nama as nama_spj,convert(varchar,a.tgl_mulai,103) as tgl_mulai,convert(varchar,a.tgl_selesai,103) as tgl_selesai,a.lama,a.tarif,a.persen,a.nilai "+
							 "from sp_spj_dh a inner join sp_status b on a.sts_spj=b.sts_spj "+
							 "where a.no_spj='"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";				
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg2.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];													
						this.sg2.appendData([line.sts_spj,line.nama_spj,line.tgl_mulai,line.tgl_selesai,floatToNilai(line.lama),floatToNilai(line.tarif),floatToNilai(line.persen),floatToNilai(line.nilai)]);
					}
				} else this.sg2.clear(1);
				this.sg2.validasi();
				
				if (this.sg.cells(1,row) == "INPROG") {
					setTipeButton(tbSimpan);
					this.stsSimpan = 1;					
				}
				else {					
					setTipeButton(tbUbahHapus);
					this.stsSimpan = 0;
				}
				
			}
		} catch(e) {alert(e);}
	},		
	doLoad:function(sender){	
		this.pc1.setActivePage(this.pc1.childPage[1]);			
		var strSQL = "select a.progress,a.no_spj as no_bukti,'INPROG' as status,"+
					"convert(varchar,d.tgl_mulai,103) as tglawal, convert(varchar,d.tgl_selesai,103) as tglakhir, c.kode_unit+' - '+c.nama as pp,b.keterangan,a.tempat, "+
					"a.nik_spj+' - '+a.nama_spj as nik,a.no_app1,convert(varchar,a.tgl_input,120) as tglinput, "+
					"a.kode_pp, case when a.nik_app1 = '-' then a.nik_app2 else a.nik_app1 end as nik_app2 , a.no_perintah  "+
					"from sp_spj_m a "+
				
					"inner join sp_perintah_m b on a.no_perintah=b.no_perintah and a.kode_lokasi=b.kode_lokasi and b.no_batch<>'-' "+	
					"inner join sp_unit c on a.kode_unit=c.kode_unit and a.kode_lokasi=c.kode_lokasi "+	
				
					"inner join ( "+							
					"	select no_spj,min(tgl_mulai) as tgl_mulai, max(tgl_selesai) as tgl_selesai "+
					"	from sp_spj_dh "+
					"	where kode_lokasi='"+this.app._lokasi+"' group by no_spj "+						
					") d on a.no_spj=d.no_spj "+
				
					"where a.progress = '2' and a.prog_batch='1' "+
					"and a.no_perintah='"+this.noPerintah+"' and a.kode_lokasi='"+this.app._lokasi+"' ";

		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn.rearrange();
			this.doTampilData(1);
		} else this.sg.clear(1);
		
		var data = this.dbLib.getDataProvider(
					"select a.* "+
					",isnull(b.nama_file,'') as nama_file1 "+
					",isnull(c.nama_file,'') as nama_file2 "+
					",isnull(d.nama_file,'') as nama_file3 "+
					",isnull(e.nama_file,'') as nama_file4 "+
					",isnull(f.nama_file,'') as nama_file5 "+

					"from sp_perintah_m a "+
					"	inner join sp_perintah_d g on a.no_perintah=g.no_perintah and a.kode_lokasi=g.kode_lokasi "+
					"	left join sp_dok b on a.no_perintah=b.no_bukti and a.kode_lokasi=b.kode_lokasi and b.kode_jenis='SP' and b.nu = 1 "+							 
					"	left join sp_dok c on a.no_perintah=c.no_bukti and a.kode_lokasi=c.kode_lokasi and c.kode_jenis='SP' and c.nu = 2 "+							 
					"	left join sp_dok d on a.no_perintah=d.no_bukti and a.kode_lokasi=d.kode_lokasi and d.kode_jenis='SP' and d.nu = 3 "+							 
					"	left join sp_dok e on a.no_perintah=e.no_bukti and a.kode_lokasi=e.kode_lokasi and e.kode_jenis='SP' and e.nu = 4 "+							 
					"	left join sp_dok f on a.no_perintah=f.no_bukti and a.kode_lokasi=f.kode_lokasi and f.kode_jenis='SP' and f.nu = 5 "+							 
					"where a.no_perintah='"+this.noPerintah+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);

		if (typeof data == "object"){
			var line = data.rs.rows[0];							
			if (line != undefined){
				this.e_file.setText(line.nama_file1);
				this.fileBfr = line.nama_file1;	
				this.e_file2.setText(line.nama_file2);
				this.fileBfr2 = line.nama_file2;	
				this.e_file3.setText(line.nama_file3);
				this.fileBfr3 = line.nama_file3;	
				this.e_file4.setText(line.nama_file4);
				this.fileBfr4 = line.nama_file4;	
				this.e_file5.setText(line.nama_file5);
				this.fileBfr5 = line.nama_file5;	
			} 
		}		
	},							
	doTampilData: function(page) {
		this.sg.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];																			
			this.sg.appendData([line.no_bukti,line.status.toUpperCase(),line.nik,line.tglawal,line.tglakhir,line.keterangan,line.pp,line.tempat,line.no_app1,line.tglinput,line.kode_pp,line.nik_app2,"Detail"]); 
		}
		this.sg.setNoUrut(start);		
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {								
								this.nama_report="server_report_saku3_sppd_rptAppSdm";
								this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_spj='"+this.e_nobukti.getText()+"' ";
								this.filter = this.filter2;
								this.viewer.prepare();
								this.viewer.setVisible(true);
								this.app._mainForm.pButton.setVisible(false);
								this.app._mainForm.reportNavigator.setVisible(true);
								this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,1,this.filter2));
								this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
								this.app._mainForm.reportNavigator.rearrange();
								this.showFilter = undefined;
								this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter, 1,  1, this.showFilter, this.app._namalokasi,this.filter2));
								this.page = 1;
								this.allBtn = false;
								this.pc1.hide();
							} 
							else {
								system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.e_nb.getText()+")","");							
								this.clearLayar();
							} 
						}else system.info(this,result,"");
	    			break;					
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},
	doCloseReportClick: function(sender){
		switch(sender.getName()){
			case "PreviewBtn" :        
				window.open(this.report.previewWithHeader(this.nama_report,this.filter,1,1, this.showFilter,this.app._namalokasi,this.filter2));
			break;
			case "PrintBtn" :
				this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter,1,1, this.showFilter,this.app._namalokasi,this.filter2));
				try
				{
					window.frames[this.viewer.getFullId() +"_iframe"].focus();
					window.frames[this.viewer.getFullId() +"_iframe"].print();
				}catch(e)
				{alert(e);}
			break;
			default :				
				this.pc1.show();   
				this.viewer.setVisible(false);
				this.app._mainForm.pButton.setVisible(true);
				this.app._mainForm.reportNavigator.setVisible(false);  
				this.clearLayar();				
			break;
		}
	},
	clearLayar : function(){
		try {
			this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);
			this.doClick();										
			this.pc1.setActivePage(this.pc1.childPage[0]);				
			this.e_memo.setText("");
			setTipeButton(tbAllFalse);
			this.doLoadSP();
		} catch(e) {
			alert(e);
		}
	}
});

