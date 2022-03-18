window.app_saku2_transaksi_siaga_fKBList = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_siaga_fKBList.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_siaga_fKBList";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Daftar Pembayaran : Input", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this,{bound:[20,13,450,20],caption:"Keterangan", maxLength:150});				
		this.cb_buat = new saiCBBL(this,{bound:[20,16,200,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2});				
		this.cb_man = new saiCBBL(this,{bound:[20,17,200,20],caption:"NIK Manajer", multiSelection:false, maxLength:10, tag:2});				
		this.cb_tahu = new saiCBBL(this,{bound:[20,18,200,20],caption:"NIK Mengetahui", multiSelection:false, maxLength:10, tag:2});				
		this.cb_setuju = new saiCBBL(this,{bound:[20,16,200,20],caption:"NIK Menyetujui", multiSelection:false, maxLength:10, tag:2});				
		this.bTampil = new portalui_button(this,{bound:[840,16,80,18],caption:"Tampil Data",click:[this,"doLoadData"]});						
		
		this.pc1 = new pageControl(this,{bound:[20,18,900,340], childPage:["Data Item Pengajuan","Detail Pengajuan"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:11,tag:0,
		            colTitle:["Status","Bank Acc","Nama Bank","Jenis","No BG/Cek","No Bukti","Uraian","Tgl Bayar","Curr","Nilai","Modul"],					
					colWidth:[[10,9,8,7,6,5,4,3,2,1,0],[70,100,50,70,200,100,80,70,150,80,70]],					
					columnReadOnly:[true,[0,2,5,6,7,8,9,10],[1,3,4]],
					buttonStyle:[[0,1,3],[bsAuto,bsEllips,bsAuto]],checkItem: true,
					picklist:[[0,3],[new portalui_arrayMap({items:["APP","INPROG"]}),new portalui_arrayMap({items:["TRANS","BG","CEK","CASH"]})]],
					colFormat:[[9],[cfNilai]],
					dblClick:[this,"doDoubleClick"],ellipsClick:[this,"doEllipsClick"],
					autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg});		
		this.cb1 = new portalui_checkBox(this.sgn,{bound:[840,5,100,25],caption:"Preview",selected:true});
		
		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:9,tag:9,
		            colTitle:["Kode Akun","Nama Akun","Kode PP","Nama PP","Kode DRK","Nama DRK","Keterangan","DC","Nilai"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[100,50,200,150,80,150,80,150,80]],
					readOnly:true,colFormat:[[8],[cfNilai]],autoAppend:false,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});		
		
		
		this.rearrangeChild(10, 23);
					
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			var data = this.dbLib.getDataProvider("select nik,nama from karyawan where nik='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_buat.setText(line.nik,line.nama);
			} else this.cb_buat.setText("","");			
						
			this.cb_buat.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);							
			this.cb_man.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);							
			this.cb_tahu.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);							
			this.cb_setuju.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);							
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_siaga_fKBList.extend(window.childForm);
window.app_saku2_transaksi_siaga_fKBList.implement({
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"gr_kaslist_m","no_kaslist",this.app._lokasi+"-KBL"+this.e_periode.getText().substr(2,4)+".","0000"));
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();										
					sql.add("insert into gr_kaslist_m(no_kaslist,tanggal,kode_lokasi,periode,keterangan,nik_buat,nik_man,nik_tahu,nik_setuju,nik_user,tgl_input) values "+
						    "('"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.e_ket.getText()+"','"+this.cb_buat.getText()+"','"+this.cb_man.getText()+"','"+this.cb_tahu.getText()+"','"+this.cb_setuju.getText()+"','"+this.app._userLog+"',getdate())");					
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								if (this.sg.cells(0,i) == "APP") {
									if (this.sg.cells(10,i) == "SPB") sql.add("update gr_spb_m set no_kaslist='"+this.e_nb.getText()+"' where no_spb='"+this.sg.cells(5,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
									
									sql.add("insert into gr_kaslist_d(no_kaslist,kode_lokasi,no_bukti,modul,kode_bank,via,no_bg,no_kas,keterangan,tgl_bayar,kode_curr,nilai) values "+
											"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(5,i)+"','"+this.sg.cells(10,i)+"','"+this.sg.cells(1,i)+"','"+this.sg.cells(3,i)+"','"+this.sg.cells(4,i)+"','-','"+this.sg.cells(6,i)+"','"+this.sg.cells(7,i)+"','"+this.sg.cells(8,i)+"',"+parseNilai(this.sg.cells(9,i))+")");
								}
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
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
					this.sg.clear(1); this.sg2.clear(1); this.e_curr.setText("IDR"); this.e_kurs.setText("1"); 										
					this.pc1.setActivePage(this.pc1.childPage[0]);
					setTipeButton(tbSimpan);
				break;
			case "simpan" :	
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				var temu = false;
				for (var i=0;i < this.sg.getRowCount();i++){
					if (this.sg.rowValid(i)){
						if (this.sg.cells(0,i) == "APP") {
							temu = true;
							if (this.sg.cells(1,i)=="" || this.sg.cells(1,i)=="-" || this.sg.cells(3,i)=="" || this.sg.cells(4,i)=="") {
								system.alert(this,"Transaksi tidak valid.","Data tidak lengkap [Acc Bank,Via,No BG].");
								return false;						
							}
						}							
					}
				}
				if (!temu) {
					system.alert(this,"Transaksi tidak valid.","Tidak ada data yang di-Approve statusnya.");
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
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else this.e_periode.setText(this.app._periode);
		this.e_nb.setText("");		
	},
	doLoadData:function(sender){				
		if (this.e_periode.getText()!="") {
			var strSQL = "select no_spb as no_bukti,keterangan,convert(varchar,due_date,103) as due_date,kode_curr,nilai as nilai_curr,'SPB' as modul "+
					     "from gr_spb_m where no_kaslist='-' and periode<='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";			
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData(["INPROG","-","-","TRANS","-",line.no_bukti,line.keterangan,line.due_date,line.kode_curr,floatToNilai(line.nilai_curr),line.modul.toUpperCase()]);
				}				
			} else this.sg.clear(1);									
		}			
	},
	doClick:function(sender){
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"gr_kaslist_m","no_kaslist",this.app._lokasi+"-KBL"+this.e_periode.getText().substr(2,4)+".","0000"));
		this.e_ket.setFocus();
	},	
	doEllipsClick: function(sender, col, row){
		try{			
			if (sender == this.sg) {
				if (col == 1){					
					this.standarLib.showListData(this, "Daftar Account Bank",sender,undefined, 
												  "select kode_bank,nama+' | '+no_rek as nama from bank where kode_lokasi = '"+this.app._lokasi+"' and kode_curr='"+this.sg.cells(8,row)+"'",
												  "select count(kode_bank) from bank where kode_lokasi = '"+this.app._lokasi+"' and kode_curr='"+this.sg.cells(8,row)+"'",
												  ["kode_bank","nama"],"and",["Kode","Nama | Rekening"],false);				
				}				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doDoubleClick: function(sender, col , row) {
		if (this.sg.cells(5,row) != "" && this.sg.cells(10,row) != "") {
			this.pc1.setActivePage(this.pc1.childPage[0]);
			var strSQL = "";
			switch(this.sg.cells(10,row)){
				case "SPB" :
							strSQL = "select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai_curr,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk "+
									 "from gr_spb_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
									 "                inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
									 "                left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
									 "where a.no_spb = '"+this.sg.cells(5,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'";
					break;				
					
			}
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg2.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg2.appendData([line.kode_akun,line.nama_akun,line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk,line.keterangan,line.dc,floatToNilai(line.nilai_curr)]);
				}
			} else this.sg2.clear(1);
			this.pc1.setActivePage(this.pc1.childPage[1]);
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){							
							system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.e_nb.getText()+")","");							
							this.clearLayar();
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
			this.sg.clear(1); this.sg2.clear(1); 
			this.pc1.setActivePage(this.pc1.childPage[0]);
			setTipeButton(tbSimpan);
		} catch(e) {
			alert(e);
		}
	}
});