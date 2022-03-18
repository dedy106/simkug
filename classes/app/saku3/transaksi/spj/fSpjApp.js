window.app_saku3_transaksi_spj_fSpjApp = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_spj_fSpjApp.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_spj_fSpjApp";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Approval SPPD: Input/Edit", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,450], childPage:["Data Approval","List Approval"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:5,tag:9,
		            colTitle:["No Bukti","Tanggal","Modul","Dasar SPPD","Maksud/Tujuan"],
					colWidth:[[4,3,2,1,0],[410,280,80,80,100]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});						
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.e_dok = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,13,450,20],caption:"No Dokumen", maxLength:50});						
		this.bLoad = new button(this.pc2.childPage[0],{bound:[480,13,80,18],caption:"Tampil Data",click:[this,"doLoad"],visible:false});			
				
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,12,995,370], childPage:["Data Approval","Daftar PD","Detail Transport","Detail U Harian"]});		
		this.e_ket = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,17,450,20],caption:"Maksud / Tujuan", maxLength:150});						
		this.e_dasar = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,14,450,20],caption:"Dasar Perj. Dinas", maxLength:150});				
		this.cb_app = new saiCBBL(this.pc1.childPage[0],{bound:[20,15,220,20],caption:"NIK Perintah", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});						
		this.e_jab = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,17,450,20],caption:"Jabatan", maxLength:150});				
		
		this.sg5 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:9,tag:0,
		            colTitle:["Status","No PD","Nama","Tgl Kegiatan","Deskripsi","Nilai","Akun","PP","DRK"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[250,250,250,80,220,70,150,100,80]],colFormat:[[5],[cfNilai]],										
					readOnly:true,buttonStyle:[[0],[bsAuto]],picklist:[[0],[new portalui_arrayMap({items:["APP","INPROG"]})]],
					dblClick:[this,"doDoubleClick5"],change:[this,"doChangeCell5"],autoAppend:false,defaultRow:1});		
		this.sgn5 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg5,pager:[this,"doPager5"]});		
		
		this.sg2 = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:9,tag:9,		            
					colTitle:["Kode Jns","Jenis Angkutan","Kode Rute","Nama","Tempat Asal","Tempat Tujuan","Tarif","Jumlah","Nilai"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[80,80,80,155,155,180,70,80,60]],
					readOnly:true,					
					colFormat:[[6,7,8],[cfNilai,cfNilai,cfNilai]],
					defaultRow:1,autoAppend:false});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});
		this.sg4 = new saiGrid(this.pc1.childPage[3],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:8,tag:9,
		            colTitle:["Kd Jenis","Jenis SPPD","Tanggal Berangkat","Tanggal Tiba","Lama Hari","Tarif","Persen","Nilai"],
					colWidth:[[7,6,5,4,3,2,1,0],[100,80,100,120,120,120,220,80]],
					readOnly:true, colFormat:[[2,3,4,5,6,7],[cfDate,cfDate,cfNilai,cfNilai,cfNilai,cfNilai]], defaultRow:1,
					autoAppend:false});
		this.sgn4 = new portalui_sgNavigator(this.pc1.childPage[3],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg4});
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		this.pc1.childPage[0].rearrangeChild(10, 23);	
					
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();				
		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;			
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
						
			this.flagGarFree = "0"; this.flagDokFree = "0";
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('GARFREE','DOKFREE') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "GARFREE") this.flagGarFree = line.flag;			
					if (line.kode_spro == "DOKFREE") this.flagDokFree = line.flag;			
				}
			}						
			this.cb_app.setSQL("select nik, nama from karyawan where flag_aktif='1'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_spj_fSpjApp.extend(window.childForm);
window.app_saku3_transaksi_spj_fSpjApp.implement({	
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
			if (this.stsSimpan == 1) this.doClick();
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.stsSimpan == 0) {
						sql.add("update yk_spj_m set no_app='-',progress='0' where no_app = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from app_m where no_app = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from app_d where no_app = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from yk_spj_app where no_app = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}					
					sql.add("insert into app_m (no_app,tanggal,kode_lokasi,periode,nik_user,tgl_input,status,modul,no_appseb) values "+
							"('"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'APPROVE','SPPD','-')");										
					sql.add("insert into yk_spj_app(no_app,kode_lokasi,maksud,dasar,nik_app,jabatan,no_dokumen,no_ver,no_spb,progress,periode,tanggal) values "+
					        "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_ket.getText()+"','"+this.e_dasar.getText()+"','"+this.cb_app.getText()+"','"+this.e_jab.getText()+"','"+this.e_dok.getText()+"','-','-','1','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"')");
					
					for (var i=0;i < this.dataJU5.rs.rows.length;i++){
						line = this.dataJU5.rs.rows[i];
						if (line.status.toUpperCase() == "APP") {
							sql.add("update yk_spj_m set no_app='"+this.e_nb.getText()+"',progress='1' where no_spj = '"+line.no_spj+"' and kode_lokasi='"+this.app._lokasi+"'");
							sql.add("insert into app_d (no_app,status,modul,no_bukti,kode_lokasi,catatan) values "+
									"('"+this.e_nb.getText()+"','APPROVE','SPPD','"+line.no_spj+"','"+this.app._lokasi+"','-')");
						}
					}									
					setTipeButton(tbAllFalse);					
					this.dbLib.execArraySQL(sql);
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
					this.sg5.clear(1); this.sg2.clear(1); this.sg4.clear(1); 
					this.pc2.setActivePage(this.pc2.childPage[0]);					
					this.doLoad();
					setTipeButton(tbAllFalse);					
				break;
			case "simpan" :															
			case "ubah" :															
				this.preView = "1";								
				var temu = false;
				var jml = 0;
				for (var i=0;i < this.dataJU5.rs.rows.length;i++){
					line = this.dataJU5.rs.rows[i];
					if (line.status.toUpperCase() == "APP") {
						temu = true;
						jml = jml+1;
					}
				}
				if (jml != 1){
					system.alert(this,"Transaksi tidak valid.","Status APP hanya untuk satu nomor SPPD.");
					return false;
				}
				if (!temu){
					system.alert(this,"Transaksi tidak valid.","Tidak ada SPPD dengan status APP.");
					return false;
				}
				else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
			case "hapus" :	
				this.preView = "0";				
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();
				sql.add("update yk_spj_m set no_app='-',progress='0' where no_app = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from app_m where no_app = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from app_d where no_app = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from yk_spj_app where no_app = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
		if (this.stsSimpan == 1) this.doClick();				
		this.doLoad();
	},
	doChange:function(sender){
		if ((sender == this.e_periode) && this.stsSimpan ==1) this.doClick();						
		if (sender == this.cb_app && this.cb_app.getText()!="" && this.stsSimpan ==1) {
			var data2 = this.dbLib.getDataProvider("select jabatan from karyawan where nik='"+this.cb_app.getText()+"'",true);
			if (typeof data2 == "object" && data2.rs.rows[0] != undefined){
				var line2 = data2.rs.rows[0];
				this.e_jab.setText(line2.jabatan);
			} else this.e_jab.setText("");				
		}
	},
	doClick:function(sender){
		if (this.e_periode.getText()!= "") {
			if (this.stsSimpan == 0) {					
				this.sg5.clear(1); 
				this.sg2.clear(1); 
				this.sg4.clear(1); 
				this.dataJU5 = {rs:{rows:[]}};							
			}
			this.stsSimpan = 1;
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"app_m","no_app",this.app._lokasi+"-PDA"+this.e_periode.getText().substr(2,4)+".","0000"));						
			this.e_dok.setFocus();
			setTipeButton(tbSimpan);			
		}		
	},
	doLoad:function(sender){		
		if (this.app._userStatus == "A") var nikApp = ""; else var nikApp = " a.nik_app = '"+this.app._userLog+"' and "; 
		this.dataJU5 = {rs:{rows:[]}};
		var strSQL = "select 'INPROG' as status,a.no_spj,a.nama_spj,convert(varchar,a.due_date,103) as tgl,a.keterangan,a.transport+a.harian as nilai,b.kode_akun+' - '+b.nama as akun, c.kode_pp+' - '+c.nama as pp,isnull(d.kode_drk,'-')+' - '+isnull(d.nama,'-') as drk "+
		             "from yk_spj_m a inner join masakun b on a.akun_uhar=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+					 
					 "                inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+					 					 
					 "                left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun='"+this.e_periode.getText().substr(0,4)+"' "+					 
					 "where "+nikApp+" a.progress='0' and a.kode_lokasi='"+this.app._lokasi+"' ";				
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU5 = data;
			this.sgn5.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn5.rearrange();
			this.doTampilData5(1);
		} else this.sg5.clear(1);						
		this.pc1.setActivePage(this.pc1.childPage[0]);
	},
	doTampilData5: function(page) {		
		this.sg5.clear(); 
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU5.rs.rows.length? this.dataJU5.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU5.rs.rows[i];									
			this.sg5.appendData([line.status.toUpperCase(),line.no_spj,line.nama_spj,line.tgl,line.keterangan,floatToNilai(line.nilai),line.akun,line.pp,line.drk]);
		}
		this.sg5.setNoUrut(start);		
	},
	doPager5: function(sender, page) {
		this.doTampilData5(page);
	},	
	doChangeCell5: function(sender, col , row) {
		if (col == 0) {			
			this.dataJU5.rs.rows[((this.page-1)*20) + row].status = this.sg5.cells(0,row);						
		}
	},
	doDoubleClick5: function(sender, col , row) {
		if (this.sg5.cells(1,row) != "") {			
			this.pc1.setActivePage(this.pc1.childPage[2]);			
			var strSQL = "select a.kode_trans,a.asal+'-'+a.tujuan as nama,a.nilai,a.asal,a.tujuan,a.kode_jenis,a.tarif,a.jumlah,b.nama as nama_jenis "+
			             "from yk_spj_dt a inner join yk_spj_jenis b on a.kode_jenis=b.kode_jenis  "+
					     "where a.no_spj='"+this.sg5.cells(1,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){				
				var line;
				this.sg2.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg2.appendData([line.kode_jenis,line.nama_jenis,line.kode_trans,line.nama,line.asal,line.tujuan,floatToNilai(line.tarif),floatToNilai(line.jumlah),floatToNilai(line.nilai)]);
				}
			} else this.sg2.clear(1);
						
			var data = this.dbLib.getDataProvider(
					   "select a.sts_spj,b.nama as nama_spj,convert(varchar,a.tgl_mulai,103) as tgl_mulai,convert(varchar,a.tgl_selesai,103) as tgl_selesai,a.lama,a.tarif,a.persen,a.nilai "+
			           "from yk_spj_dh a inner join yk_status_spj b on a.sts_spj=b.sts_spj "+
					   "where a.no_spj='"+this.sg5.cells(1,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg4.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg4.appendData([line.sts_spj,line.nama_spj,line.tgl_mulai,line.tgl_selesai,floatToNilai(line.lama),floatToNilai(line.tarif),floatToNilai(line.persen),floatToNilai(line.nilai)]);
				}
			} else this.sg4.clear(1);													
		}
	},		
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {								
								this.nama_report="server_report_saku3_kb_rptKbJurnalBukti";
								this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_kas='"+this.e_nb.getText()+"' ";
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
								this.pc2.hide();
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
				this.pc2.show();   
				this.viewer.setVisible(false);
				this.app._mainForm.pButton.setVisible(true);
				this.app._mainForm.reportNavigator.setVisible(false);  
				this.clearLayar();				
			break;
		}
	},
	clearLayar : function(){
		try {
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
			this.dataJU5 = {rs:{rows:[]}};
			this.sg5.clear(1); 
			this.pc2.setActivePage(this.pc2.childPage[0]);
			this.pc1.setActivePage(this.pc1.childPage[0]);			
			this.doLoad();
			setTipeButton(tbAllFalse);
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){																				
		var strSQL = "select a.no_app,convert(varchar,a.tanggal,103) as tgl,a.modul,b.dasar,b.maksud "+
		             "from app_m a inner join yk_spj_app b on a.no_app=b.no_app and a.kode_lokasi=b.kode_lokasi "+					 					 
					 "             left join (select distinct no_app,kode_lokasi from yk_spj_m where no_spb<>'-' and kode_lokasi='"+this.app._lokasi+"') c on b.no_app=c.no_app and b.kode_lokasi=c.kode_lokasi "+
					 "where c.no_app is null and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul = 'SPPD' and a.nik_user='"+this.app._userLog+"' ";		
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU3 = data;
			this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn3.rearrange();
			this.doTampilData3(1);
		} else this.sg3.clear(1);					
	},
	doTampilData3: function(page) {
		this.sg3.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU3.rs.rows.length? this.dataJU3.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU3.rs.rows[i];													
			this.sg3.appendData([line.no_app,line.tgl,line.modul,line.dasar,line.maksud]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[0]);
				this.pc1.setActivePage(this.pc1.childPage[0]);																		
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;								
				this.e_nb.setText(this.sg3.cells(0,row));								
								
				var strSQL = "select a.tanggal,b.no_dokumen,b.dasar,b.maksud,b.nik_app,b.jabatan "+
							 "from app_m a inner join yk_spj_app b on a.no_app=b.no_app and a.kode_lokasi=b.kode_lokasi "+
							 "where a.no_app = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){								
						this.dp_d1.setText(line.tanggal);
						this.e_dok.setText(line.no_dokumen);
						this.e_ket.setText(line.maksud);												
						this.e_dasar.setText(line.dasar);												
						this.cb_app.setText(line.nik_app);												
						this.e_jab.setText(line.jabatan);												
					}
				}								
				this.dataJU5 = {rs:{rows:[]}};
				var strSQL = "select 'APP' as status,a.no_spj,a.nama_spj,convert(varchar,a.due_date,103) as tgl,a.keterangan,a.transport+a.harian as nilai,b.kode_akun+' - '+b.nama as akun, c.kode_pp+' - '+c.nama as pp,isnull(d.kode_drk,'-')+' - '+isnull(d.nama,'-') as drk "+
					 "from yk_spj_m a inner join masakun b on a.akun_uhar=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+					 
					 "                inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+					 					 
					 "                left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi "+					 
					 "where a.no_app='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ";		
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU5 = data;
					this.sgn5.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn5.rearrange();
					this.doTampilData5(1);
				} else this.sg5.clear(1);						
				this.pc1.setActivePage(this.pc1.childPage[0]);												
			}									
		} catch(e) {alert(e);}
	}
});