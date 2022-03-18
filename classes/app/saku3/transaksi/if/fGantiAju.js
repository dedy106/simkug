window.app_saku3_transaksi_if_fGantiAju = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_if_fGantiAju.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_if_fGantiAju";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Penggantian Kuitansi: Input", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,13,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,13,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,13,100,18],selectDate:[this,"doSelectDate"]}); 		
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,450], childPage:["Data Penggantian","List Penggantian"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:4,tag:9,
		            colTitle:["No Bukti","Tanggal","Deskripsi","Nilai"],
					colWidth:[[3,2,1,0],[100,500,80,100]],
					colFormat:[[3],[cfNilai]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});						
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});				
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,11,202,20],caption:"No Bukti",maxLength:30,readOnly:true});		
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,11,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.cb_nik = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,12,222,20],caption:"Pemegang IF",tag:2,multiSelection:false,change:[this,"doChange"]}); 						
		this.cb_pp = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,13,222,20],caption:"Bagian / Unit",tag:2,readOnly:true}); 								
		this.e_saldo = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,13,202,20],caption:"Saldo IF", tag:1, tipeText:ttNilai, text:"0",readOnly:true});
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,550,20],caption:"Uraian", maxLength:150});					
		this.bTampil = new button(this.pc2.childPage[0],{bound:[690,16,80,18],caption:"Tampil Data",click:[this,"doLoad"]});			
		this.e_nilai = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,16,202,20],caption:"Total Ganti", tag:1, tipeText:ttNilai, text:"0",readOnly:true});
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,12,995,320], childPage:["Data Pengajuan"]});
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:10,tag:0,		            
					colTitle:["Status","Tanggal","Tgl Kuitansi","Uraian","Nilai","No Pengajuan","Akun","DRK","PP","NIK Pengaju"],
					colWidth:[[9,8,7,6,5,4,3,2,1,0],[130,60,60,60,90,80,260,70,70,70]],										
					columnReadOnly:[true,[0,1,2,3,4,5,6,7,8,9],[]],
					buttonStyle:[[0],[bsAuto]],colFormat:[[4],[cfNilai]],
					picklist:[[0],[new portalui_arrayMap({items:["GANTI","INPROG"]})]],
					nilaiChange:[this,"doNilaiChange"],change:[this,"doChangeCells"],autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg});		
						
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
						
			if (this.app._userStatus == "A") this.cb_pp.setSQL("select kode_pp, nama from pp where flag_aktif ='1' and tipe = 'Posting' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data Unit",true);
			else this.cb_pp.setSQL("select kode_pp, nama from pp where kode_pp='"+this.app._kodePP+"' and flag_aktif ='1' and tipe = 'Posting' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data Prodi/Unit",true);
			this.cb_pp.setText(this.app._kodePP);
			this.cb_nik.setSQL("select a.nik, a.nama from karyawan a inner join if_m b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi where b.flag_aktif='1' and a.nik='"+this.app._userLog+"' and a.kode_lokasi='"+this.app._lokasi+"'",["a.nik","a.nama"],false,["Kode","Nama"],"and","Data Pemegang",true);
			this.cb_nik.setText(this.app._userLog);			
						
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_if_fGantiAju.extend(window.childForm);
window.app_saku3_transaksi_if_fGantiAju.implement({	
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
						sql.add("delete from if_ganti_m where no_ganti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("update if_aju_m set no_ganti='-',progress='1' where no_reim='-' and no_ganti ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}					
					sql.add("insert into if_ganti_m(no_ganti,kode_lokasi,periode,tanggal,nik,kode_pp,keterangan,tgl_input,nik_user,nilai,no_reim) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.cb_nik.getText()+"','"+this.cb_pp.getText()+"','"+this.e_ket.getText()+"',getdate(),'"+this.app._userLog+"',"+nilaiToFloat(this.e_nilai.getText())+",'-')");
					
					for (var i = 0; i < this.sg.rows.getLength();i++){
						if (this.sg.rowValid(i) && this.sg.cells(0,i) == "GANTI"){							
							sql.add("update if_aju_m set no_ganti='"+this.e_nb.getText()+"',progress='2' where  no_reim='-' and no_aju ='"+this.sg.cells(5,i)+"' and kode_lokasi='"+this.app._lokasi+"'");							
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
					setTipeButton(tbAllFalse);
					this.pc2.setActivePage(this.pc2.childPage[0]);
					this.pc1.setActivePage(this.pc1.childPage[0]);			
					this.sg.clear(1); this.sg3.clear(1);										
					this.doChange(this.cb_nik);					
				break;
			case "simpan" :		
			case "ubah" :					
				this.preView = "1";
				this.sg.validasi();											
				if (nilaiToFloat(this.e_saldo.getText()) < nilaiToFloat(this.e_nilai.getText())) {
					system.alert(this,"Nilai transaksi tidak valid.","Nilai tidak boleh melebihi Saldo.");
					return false;
				}
				if (nilaiToFloat(this.e_nilai.getText()) <= 0) {
					system.alert(this,"Nilai transaksi tidak valid.","Nilai tidak boleh nol atau kurang.");
					return false;
				}
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
				sql.add("delete from if_ganti_m where no_ganti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
				sql.add("update if_aju_m set no_ganti='-',progress='1' where  no_reim='-' and no_ganti ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");							
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
		if (this.e_periode.getText()!= "") {
			if (this.stsSimpan == 0) {					
				this.sg.clear(1);				
				this.sg3.clear(1);
				this.bTampil.show();				
				this.e_nilai.setText("0");
			}			
			this.stsSimpan = 1;
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"if_ganti_m","no_ganti",this.app._lokasi+"-IFG"+this.e_periode.getText().substr(2,4)+".","0000"));
			this.e_ket.setFocus();		
			setTipeButton(tbSimpan);			
			this.doChange(this.cb_nik);
		}
	},		
	doChange:function(sender){		
		if (sender == this.cb_nik && this.cb_nik.getText()!="") {
			if (this.stsSimpan == 1) var noGanti = ""; else var noGanti = " and a.no_ganti <> '"+this.e_nb.getText()+"' "; 
			var strSQL = "select a.kode_pp,a.nilai-isnull(b.ganti,0)-isnull(e.reimburse,0) as saldo "+ 
			             "from if_m a "+
						 "		  left join (select a.kode_lokasi,a.nik,sum(b.nilai) as ganti "+
						 "					 from if_ganti_m a inner join if_aju_m b on a.no_ganti=b.no_ganti and a.kode_lokasi=b.kode_lokasi and b.no_reim ='-' "+
						 "					 where a.nik='"+this.cb_nik.getText()+"' and a.kode_lokasi ='"+this.app._lokasi+"' "+ noGanti +
						 "					 group by a.nik,a.kode_lokasi) b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+						 						 
						 "	      left join (select nik_buat,kode_lokasi,sum(nilai) as reimburse "+
					     "                   from if_reim_m "+						 
						 "                   where no_kas='-' and kode_lokasi='"+this.app._lokasi+"' and nik_buat='"+this.cb_nik.getText()+"' "+
						 "                   group by nik_buat,kode_lokasi) e on a.nik=e.nik_buat and a.kode_lokasi=e.kode_lokasi "+						 
						 "where a.nik='"+this.cb_nik.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";						   			
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){							
					this.e_saldo.setText(floatToNilai(line.saldo));					
					this.cb_pp.setText(line.kode_pp);					
				}
			}
		}
	},
	doLoad:function(sender){				
		if (this.cb_nik.getText() != "" && this.e_periode.getText() != "") {						
			var data = this.dbLib.getDataProvider("select 'INPROG' as status,a.no_aju,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tgl_kuitansi,103) as tglkui,a.kode_akun,a.kode_pp,a.kode_drk,a.keterangan,a.nilai,e.nik+' - '+e.nama as niksub "+
					   "from if_aju_m a inner join karyawan e on a.user_input=e.nik and a.kode_lokasi=e.kode_lokasi "+					   
					   "where a.no_app<>'-' and a.no_ganti = '-' and a.no_reim='-' and a.kode_lokasi='"+this.app._lokasi+"' and a.periode<='"+this.e_periode.getText()+"'",true);					   
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];													
					this.sg.appendData([line.status.toUpperCase(),line.tgl,line.tglkui,line.keterangan,floatToNilai(line.nilai),line.no_aju,line.kode_akun,line.kode_drk,line.kode_pp,line.niksub]);
				}
			} else this.sg.clear(1);									
		}
	},
	doChangeCells: function(sender, col , row) {
		if (col == 0) {
			this.sg.validasi();
		}
	},
	doNilaiChange: function(){
		try{
			var tot = 0;			
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(4,i) != "" && this.sg.cells(0,i) == "GANTI"){
					tot += nilaiToFloat(this.sg.cells(4,i));					
				}
			}			
			this.e_nilai.setText(floatToNilai(tot));			
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){							
							if (this.preView == 1) {
								this.nama_report="server_report_saku2_kopeg_kbitt_rptBebanForm";
								this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_aju='"+this.e_nb.getText()+"' ";
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
			setTipeButton(tbAllFalse);
			this.pc2.setActivePage(this.pc2.childPage[0]);
			this.pc1.setActivePage(this.pc1.childPage[0]);			
			this.sg.clear(1); this.sg3.clear(1);						
			this.doChange(this.cb_nik);			
		} catch(e) {
			alert(e);
		}
	},	
	doLoad3:function(sender){																								
		var strSQL = "select a.no_ganti,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai "+
		             "from if_ganti_m a "+					 					 
					 "where a.no_reim='-' and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ";		 
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
			this.sg3.appendData([line.no_ganti,line.tgl,line.keterangan,floatToNilai(line.nilai)]); 
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
				this.bTampil.hide();				
				this.e_nb.setText(this.sg3.cells(0,row));								
				
				var strSQL = "select keterangan,tanggal,kode_pp,nik from if_ganti_m where no_ganti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){								
						this.dp_d1.setText(line.tanggal);
						this.cb_nik.setText(line.nik);
						this.cb_pp.setText(line.kode_pp);
						this.e_ket.setText(line.keterangan);														
					}
				}												
				var data = this.dbLib.getDataProvider("select 'GANTI' as status,a.no_aju,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tgl_kuitansi,103) as tglkui,a.kode_akun,a.kode_pp,a.kode_drk,a.keterangan,a.nilai,e.nik+' - '+e.nama as niksub "+
						   "from if_aju_m a inner join karyawan e on a.user_input=e.nik and a.kode_lokasi=e.kode_lokasi "+					   
						   "where a.no_ganti = '"+this.e_nb.getText()+"' and a.no_reim='-' and a.kode_lokasi='"+this.app._lokasi+"'",true);					   
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];													
						this.sg.appendData([line.status.toUpperCase(),line.tgl,line.tglkui,line.keterangan,floatToNilai(line.nilai),line.no_aju,line.kode_akun,line.kode_drk,line.kode_pp,line.niksub]);
					}
				} else this.sg.clear(1);												
			}									
		} catch(e) {alert(e);}
	}
});