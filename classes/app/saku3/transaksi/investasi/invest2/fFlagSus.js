window.app_saku3_transaksi_investasi_invest2_fFlagSus = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_investasi_invest2_fFlagSus.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_investasi_invest2_fFlagSus";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Flag Suspend Mitra", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Mitra","List Suspend Aktif"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:6,tag:9,
		            colTitle:["No Bukti","Tanggal","Tgl Berakhir","Deskripsi","Mitra","Status"],
					colWidth:[[5,4,3,2,1,0],[80,300,300,80,80,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});		
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});		
		
		this.l_tgl1 = new portalui_label(this.pc2.childPage[0],{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this.pc2.childPage[0],{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]}); 		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});		
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});								
		this.l_tgl2 = new portalui_label(this.pc2.childPage[0],{bound:[20,13,100,18],caption:"Tgl Mulai", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc2.childPage[0],{bound:[120,13,98,18]}); 
		this.l_tgl3 = new portalui_label(this.pc2.childPage[0],{bound:[20,14,100,18],caption:"Tgl Berakhir", underline:true});
		this.dp_d3 = new portalui_datePicker(this.pc2.childPage[0],{bound:[120,14,98,18]}); 
		this.cb_bank = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,15,220,20],caption:"Mitra Bank",tag:2,multiSelection:false});         				
		this.cb_app = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,13,220,20],caption:"NIK Approve",tag:2,multiSelection:false});         				
		this.c_status = new saiCB(this.pc2.childPage[0],{bound:[20,20,200,20],caption:"Status",items:["SUSPEND","AKTIF"], readOnly:true,tag:2});				
		this.e_memo = new saiMemo(this.pc2.childPage[0],{bound:[20,12,750,200],caption:"Justifikasi",tag:9});
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);			
					
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
			
			this.cb_app.setSQL("select a.nik, a.nama from karyawan a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi where b.kode_bidang='"+this.app._kodeBidang+"' and a.flag_aktif ='1' and a.kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
			this.cb_bank.setSQL("select kode_bankklp, nama from inv_bankklp ",["kode_bankklp","nama"],false,["Kode","Nama"],"where","Data Mitra Bank",true);
			
			this.c_status.setText("SUSPEND");
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_investasi_invest2_fFlagSus.extend(window.childForm);
window.app_saku3_transaksi_investasi_invest2_fFlagSus.implement({		
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
						sql.add("update inv_bankklp set flag_aktif='"+this.statusSeb+"',no_suspen='-' where kode_bankklp='"+this.cb_bank.getText()+"'");
						sql.add("delete from inv_suspen where no_suspen='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}													
					
					if (this.c_status.getText() == "AKTIF") var vStatus = "1"; 
					else var vStatus = "0"; 
					
					sql.add("update inv_bankklp set flag_aktif='"+vStatus+"',no_suspen='"+this.e_nb.getText()+"' where kode_bankklp='"+this.cb_bank.getText()+"'");
					sql.add("insert into inv_suspen(no_suspen,kode_lokasi,periode,tgl_input,user_input,tanggal,tgl_awal,tgl_akhir,kode_bankklp,keterangan,status,nik_app,catatan) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"',getdate(),'"+this.app._userLog+"','"+this.dp_d1.getDateString()+"','"+this.dp_d2.getDateString()+"','"+this.dp_d3.getDateString()+"','"+this.cb_bank.getText()+"','"+this.e_ket.getText()+"','"+this.c_status.getText()+"','"+this.cb_app.getText()+"','"+this.e_memo.getText()+"')");
					
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
					this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);										
					setTipeButton(tbAllFalse);
					this.pc2.setActivePage(this.pc2.childPage[0]);
					this.c_status.setText("SUSPEND");
					this.sg3.clear(1);
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
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();
				sql.add("update inv_bankklp set flag_aktif='"+this.statusSeb+"',no_suspen='-' where kode_bankklp='"+this.cb_bank.getText()+"' ");
				sql.add("delete from inv_suspen where no_suspen='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
	},
	doClick:function(sender){		
		if (this.stsSimpan == 0) {
			this.sg3.clear(1);
		}
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"inv_suspen","no_suspen",this.app._lokasi+"-SUS"+this.e_periode.getText().substr(2,4)+".","0000"));
		this.e_ket.setFocus();
		setTipeButton(tbSimpan);
	},		
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){							
							if (this.preView == "1") {
								//this.nama_report="server_report_saku3_if_rptIfForm";
								//this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_suspen='"+this.e_nb.getText()+"' ";
								this.filter2 = "";
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
			this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);						
			setTipeButton(tbAllFalse);
			this.pc2.setActivePage(this.pc2.childPage[0]);
			this.c_status.setText("SUSPEND");
			this.sg3.clear(1);
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){																						
		var strSQL = "select a.no_suspen,convert(varchar,a.tgl_awal,103) as tgl_awal,convert(varchar,a.tgl_akhir,103) as tgl_akhir,a.keterangan,b.kode_bankklp+' | '+b.nama as mitra,a.status "+
		             "from inv_suspen a inner join inv_bankklp b on a.kode_bankklp=b.kode_bankklp "+					 					 
					 "where a.tgl_akhir >= '"+this.dp_d1.getDateString()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.status = 'SUSPEND'";		
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
			this.sg3.appendData([line.no_suspen,line.tgl_awal,line.tgl_akhir,line.keterangan,line.mitra,line.status]); 
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
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg3.cells(0,row));								
				
				if (this.sg3.cells(5,row) == "AKTIF") this.statusSeb = "1"; 
				else this.statusSeb = "0"; 
								
				var strSQL = "select keterangan,tanggal,tgl_awal,tgl_akhir,nik_app,catatan,kode_bankklp,status,nik_app "+
				             "from inv_suspen "+
							 "where no_suspen='"+this.e_nb.getText()+"'";							 
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){													
						this.e_ket.setText(line.keterangan);
						this.dp_d1.setText(line.tanggal);
						this.dp_d2.setText(line.tgl_awal);
						this.dp_d3.setText(line.tgl_akhir);
						this.cb_app.setText(line.nik_app);
						this.cb_bank.setText(line.kode_bankklp);
						this.c_status.setText(line.status);
						this.e_ket.setText(line.keterangan);						
						this.e_memo.setText(line.catatan);
					}
				}												
			}									
		} catch(e) {alert(e);}
	}
});