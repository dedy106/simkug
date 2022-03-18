window.app_saku3_transaksi_uin_fVerBelanja = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_uin_fVerBelanja.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_uin_fVerBelanja";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Verifikasi Pengajuan -  Belanja", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);
		
		this.c_tahun = new saiLabelEdit(this,{bound:[20,12,200,20],caption:"Tahun",readOnly:true,tag:2, change:[this,"doChange"]});
		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,470], childPage:["Data Verifikasi","Daftar Verifikasi"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:4,tag:9,
		             colTitle:["No Bukti","Tanggal","Keterangan","Pilih"],
					 colWidth:[[3,2,1,0],[70,300,100,100]],readOnly:true,	
					 colFormat:[[3],[cfButton]],	
					 click:[this,"doSgBtnClick1"], colAlign:[[3],[alCenter]],					 
					 dblClick:[this,"doDoubleClick1"],autoAppend:false,defaultRow:1});			
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		this.bLoad = new portalui_imageButton(this.sgn1,{bound:[this.sgn1.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Pengajuan",click:[this,"doLoad"]});				

		this.l_tgl1 = new portalui_label(this.pc1.childPage[0],{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this.pc1.childPage[0],{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]}); 				
		this.e_nb = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc1.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.c_status = new saiCB(this.pc1.childPage[0],{bound:[20,10,200,20],caption:"Status",items:["APPROVE","REVISI"], readOnly:true,tag:2});
		this.e_ket = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,17,450,20],caption:"Catatan", maxLength:200});				
		
		this.pc2 = new pageControl(this.pc1.childPage[0],{bound:[1,12,995,344], childPage:["Daftar Agenda","Detail RAB","Controlling","Dokumen Check","Otorisasi"]});								
		this.sg = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:6,tag:0,
					colTitle:["Fak/Unit","No Agenda","Tanggal","Deskripsi","Nilai","Pilih"],
					colWidth:[[5,4,3,2,1,0],[80,100,300,80,100,200]],					
					columnReadOnly:[true,[0,1,2,3,4,5],[]],					
					colFormat:[[4,5],[cfNilai,cfButton]],					
					dblClick:[this,"doDoubleClick"],
					click:[this,"doSgBtnClick"], colAlign:[[5],[alCenter]],									
					autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg});		

		this.sg4 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:12,tag:0,
					colTitle:["KdTrm","Nama Penerima","Deskripsi","IDItem","Satuan","Harga","Vol","Jumlah","PPN","PPh","Total","KdAkun"],
					colWidth:[[11,10,9,8,7,6,5,4,3,2,1,0],[80,80,60,60,80,60,60,60,60,200,200,80]],					
					colHide:[[0,3],[true,true]],
					readOnly:true,				
					colFormat:[[5,6,7,8,9,10],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],												
					autoAppend:false,defaultRow:1});
		this.sgn4 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg4});		

		this.sg2 = new saiGrid(this.pc2.childPage[2],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:8,tag:9, 
					colTitle:["KgGiat","KdOut","KdSOut","KdKmpnen","KdSKmpnen","KdAkun","Saldo Budget","Ni Pengajuan"],
					colWidth:[[7,6,5,4,3,2,1,0],[100,100,100,100,100,100,100,100]],
					colFormat:[[6,7],[cfNilai,cfNilai]],readOnly: true,autoAppend:false,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc2.childPage[2],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg2});		

		this.sg3 = new saiGrid(this.pc2.childPage[3],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:4,tag:9, 
					colTitle:["Status","Catatan","Kd Dokumen","Deskripsi"],
					colWidth:[[3,2,1,0],[350,80,250,80]],					
					columnReadOnly:[true,[0,2,3],[1]],	
					buttonStyle:[[0],[bsAuto]], 
					dblClick:[this,"doDoubleClick3"],
					picklist:[[0],[new portalui_arrayMap({items:["CHECK","UNCHECK"]})]],				
					autoAppend:false,defaultRow:1});
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[3],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3});		

		this.cb_terima = new saiCBBL(this.pc2.childPage[4],{bound:[20,10,220,20],caption:"Diterima Oleh", multiSelection:false, maxLength:10, tag:2});
		this.cb_periksa = new saiCBBL(this.pc2.childPage[4],{bound:[20,13,220,20],caption:"Diperiksa Oleh", multiSelection:false, maxLength:10, tag:2});
		this.cb_tahu = new saiCBBL(this.pc2.childPage[4],{bound:[20,14,220,20],caption:"Diketahui Oleh", multiSelection:false, maxLength:10, tag:2});
		this.cb_kabag = new saiCBBL(this.pc2.childPage[4],{bound:[20,15,220,20],caption:"NIK KaBag Kug", multiSelection:false, maxLength:10, tag:2});

		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);
		this.pc2.childPage[4].rearrangeChild(10, 23);
		
		setTipeButton(tbAllFalse);
		this.maximize();		

		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);

		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;		
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			this.cb_terima.setSQL("select nik, nama from karyawan where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Penerima",true);			
			this.cb_periksa.setSQL("select nik, nama from karyawan where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Penerima",true);			
			this.cb_tahu.setSQL("select nik, nama from karyawan where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Penerima",true);			
			this.cb_kabag.setSQL("select nik, nama from karyawan where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Penerima",true);			

			this.cb_terima.setText(this.app._userLog);

			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('UINKABAG','UINSUBAG') and kode_lokasi='"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																						
					if (line.kode_spro == "UINSUBAG") this.cb_periksa.setText(line.flag);
					if (line.kode_spro == "UINKABAG") this.cb_kabag.setText(line.flag);
				}
			}	

			this.gridDokumen();
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_uin_fVerBelanja.extend(window.childForm);
window.app_saku3_transaksi_uin_fVerBelanja.implement({	
	gridDokumen: function() {
		var data = this.dbLib.getDataProvider("select kode_dok,nama from uin_dok_ver where kode_lokasi='"+this.app._lokasi+"' order by idx",true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg3.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];													
				this.sg3.appendData(["UNCHECK","-",line.kode_dok,line.nama]);				
			}
		} else this.sg3.clear(1);
	},
	doLoadAju: function() {		
		var strSQL = "select a.no_aju,convert(varchar,a.tanggal,103) as tgl,a.keterangan, a.nilai-a.ppn-a.pph as nilai, a.kode_pp+' | '+b.nama as pp "+
					 "from uin_aju_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
					 "where a.progress = '1' and a.kode_lokasi='"+this.app._lokasi+"' and substring(a.periode,1,4) <= '"+this.c_tahun.getText()+"' order by a.kode_pp,a.no_aju";							 											 
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];						
				this.sg.appendData([line.pp,line.no_aju,line.tgl,line.keterangan,floatToNilai(line.nilai),"Pilih"]);
			}					
		} else this.sg.clear(1);
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
			if (this.stsSimpan == 1) this.doClick(this.i_gen);			
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.stsSimpan == 0) {
						sql.add("delete from uin_ver_m where no_ver = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
						sql.add("delete from uin_ver_d where no_ver = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
						sql.add("update uin_aju_m set no_ver='-',progress='1' where no_ver = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
					}

					if (this.c_status.getText()=="APPROVE")  var prog = "2";
					if (this.c_status.getText()=="REVISI")  var prog = "V";
					
					sql.add("update uin_ver_m set no_verseb ='"+this.e_nb.getText()+"' where no_aju='"+this.noaju+"' and no_verseb='-' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("insert into uin_ver_m (no_ver,kode_lokasi,tanggal,periode,nik_user,tgl_input,keterangan, nik_terima,nik_periksa,nik_tahu, no_aju,status,no_verseb, nik_kabag) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.periode+"','"+this.app._userLog+"',getdate(),'"+this.e_ket.getText()+"','"+this.cb_terima.getText()+"','"+this.cb_periksa.getText()+"','"+this.cb_tahu.getText()+"','"+this.noaju+"','"+this.c_status.getText()+"','-','"+this.cb_kabag.getText()+"')");

					sql.add("update uin_aju_m set no_ver='"+this.e_nb.getText()+"',progress='"+prog+"' where no_aju = '"+this.noaju+"' and kode_lokasi='"+this.app._lokasi+"'");	

					if (this.sg3.getRowValidCount() > 0){
						for (var i=0;i < this.sg3.getRowCount();i++){
							if (this.sg3.rowValid(i)) {
								sql.add("insert into uin_ver_d (no_ver,kode_lokasi,kode_dok,status,catatan) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg3.cells(2,i)+"','"+this.sg3.cells(0,i)+"','"+this.sg3.cells(1,i)+"')");	
							}
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
	hapus: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from uin_ver_m where no_ver = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
					sql.add("delete from uin_ver_d where no_ver = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
					sql.add("update uin_aju_m set no_ver='-',progress='1' where no_ver = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
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
				if (modalResult == mrOk) {
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
					this.sg.clear(1); this.sg1.clear(1); this.sg2.clear(1); this.sg3.clear(1); this.sg4.clear(1);
					this.gridDokumen();
					setTipeButton(tbAllFalse);	
					this.doLoadAju();	
					this.pc1.setActivePage(this.pc1.childPage[0]);				
					this.pc2.setActivePage(this.pc2.childPage[0]);				
				}
				break;
			case "simpan" :	
			case "ubah" :
				this.preView = "1";
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
			case "hapus" :	
				this.preView = "0";
				this.hapus();
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.c_tahun.setText(y);
		this.periode = (y+""+m);		
		
		if (this.stsSimpan == 1) {
			this.doClick(this.i_gen);			
			this.doLoadAju();	
		}
	},
	doClick:function(sender){
		if (sender == this.i_gen) {			
			if (this.stsSimpan == 0) {									
				this.sg.clear(1); 				
			}	
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"uin_ver_m","no_ver",this.app._lokasi+"-VF"+this.c_tahun.getText().substr(2,2)+".","00000"));			
			this.e_ket.setFocus();
			setTipeButton(tbSimpan);
			this.stsSimpan = 1;
		}		
	},	
	doSgBtnClick: function(sender, col, row){
		try{
			if (col === 5) {
				this.doDoubleClick(this.sg1,1,row);
			}
		}catch(e){
			alert(e);
		}
	},
	doDoubleClick: function(sender, col , row) {
		this.noaju = this.sg.cells(1,row);
		var strSQL = "select a.*,c.nama as atensi, a.total-a.ppn-a.pph as neto,a.idbukti+cast(a.nu as varchar) as iditem "+
					 "from uin_aju_d a inner join uin_atensi c on a.kode_atensi=c.kode_atensi and a.kode_lokasi=c.kode_lokasi "+
					 "where a.no_aju = '"+this.sg.cells(1,row)+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu";					 
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg4.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];							
				this.sg4.appendData([line.kode_atensi,line.atensi,line.keterangan,line.iditem,line.satuan,floatToNilai(line.tarif),floatToNilai(line.vol),floatToNilai(line.total),floatToNilai(line.ppn),floatToNilai(line.pph),floatToNilai(line.neto),line.kode_akun]);
			}			
			var kodePP = line.kode_pp;		
		} else this.sg4.clear(1);	

		var strSQL = "select * from uin_aju_r where no_aju = '"+this.sg.cells(1,row)+"' and kode_lokasi='"+this.app._lokasi+"' order by no_urut";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg2.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];							
				this.sg2.appendData([line.kdgiat,line.kdoutput,line.kdsoutput,line.kdkmpnen,line.kdskmpnen,line.kode_akun,floatToNilai(line.saldo),floatToNilai(line.nilai)]);
			}					
		} else this.sg2.clear(1);	

		var data = this.dbLib.getDataProvider("select nik_ppk from pp where kode_pp='"+kodePP+"' and kode_lokasi='"+this.app._lokasi+"'",true);
		if (typeof data == "object"){
			var line = data.rs.rows[0];							
			if (line != undefined){			
				this.cb_tahu.setText(line.nik_ppk);
			} 
		}

		this.pc2.setActivePage(this.pc2.childPage[1]);	
	},		
	doDoubleClick3: function(sender, col , row) {
		if (this.sg3.cells(0,row) == "CHECK") this.sg3.cells(0,row,"UNCHECK");
		else this.sg3.cells(0,row,"CHECK");
	},					
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							if (this.preView == "1") {						
								this.nama_report="server_report_saku3_uin_rptVer";
								this.filter2 = this.app._userLog+"/"+this.app._lokasi;
								this.filter = "where a.kode_lokasi='"+this.app._lokasi+"' and a.no_ver='"+this.e_nb.getText()+"' ";
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
	doLoad:function(sender){	
		try{					
			var strSQL = "select a.no_ver,convert(varchar,a.tanggal,103) as tgl,a.keterangan "+
						 "from uin_ver_m a inner join uin_aju_m b on a.no_ver=b.no_ver and a.kode_lokasi=b.kode_lokasi "+						 
						 "where b.progress ='2' and b.kode_lokasi='"+this.app._lokasi+"' and a.periode like '"+this.c_tahun.getText()+"%' order by a.no_ver desc";							 						

			var data = this.dbLib.getDataProvider(strSQL,true);		
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn1.rearrange();
				this.doTampilData(1);
			} else this.sg1.clear(1);						
		}
		catch(e) {
			alert(e);
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
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
			this.sg.clear(1); 
			setTipeButton(tbSimpan);
			this.stsSimpan=1;
			
		} catch(e) {
			alert(e);
		}
	},
	
	doTampilData: function(page) {		
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg1.appendData([line.no_ver,line.tgl,line.keterangan,"Pilih"]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doSgBtnClick1: function(sender, col, row){
		try{
			if (col === 3) this.doDoubleClick1(this.sg1,0,row);						
		}catch(e){
			alert(e);
		}
	},
	doDoubleClick1: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;
				this.pc1.setActivePage(this.pc1.childPage[0]);
				this.pc2.setActivePage(this.pc2.childPage[0]);
				this.e_nb.setText(this.sg1.cells(0,row));	
														
				var data = this.dbLib.getDataProvider("select * from uin_ver_m where no_ver='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){			
						this.dp_d1.setText(line.tanggal);											
						this.e_ket.setText(line.keterangan);
						this.cb_terima.setText(line.nik_terima);
						this.cb_periksa.setText(line.nik_periksa);
						this.cb_tahu.setText(line.nik_tahu);
						this.cb_kabag.setText(line.nik_kabag);
					} 
				}			
				
				var strSQL = "select a.no_aju,convert(varchar,a.tanggal,103) as tgl,a.keterangan, a.nilai-a.ppn-a.pph as nilai, a.kode_pp+' | '+b.nama as pp "+
							 "from uin_aju_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
							 "where a.no_ver='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.kode_pp,a.no_aju";							 											 
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];						
						this.sg.appendData([line.pp,line.no_aju,line.tgl,line.keterangan,floatToNilai(line.nilai),"Detail"]);
					}					
				} else this.sg.clear(1);

				this.doDoubleClick(this.sg,1,0);

				var strSQL = "select isnull(b.status,'UNCHECK') as status,isnull(b.catatan,'-') as catatan,a.kode_dok,a.nama "+
							 "from uin_dok_ver a left join uin_ver_d b on a.kode_dok=b.kode_dok and a.kode_lokasi=b.kode_lokasi "+
							 "where b.no_ver='"+this.e_nb.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"' order by a.idx";							 											 
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg3.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];						
						this.sg3.appendData([line.status.toUpperCase(),line.catatan,line.kode_dok,line.nama]);
					}					
				} else this.sg3.clear(1);			
			}
		} catch(e) {alert(e);}
	}	
});