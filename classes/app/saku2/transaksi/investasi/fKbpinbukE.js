window.app_saku2_transaksi_investasi_fKbpinbukE = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_investasi_fKbpinbukE.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_investasi_fKbpinbukE";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form KasBank Pemindahbukuan: Edit", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new saiCBBL(this,{bound:[20,12,223,20],caption:"No Bukti KB", multiSelection:false, maxLength:10, tag:1, readOnly:true,change:[this,"doChange"]});		
		this.e_dok = new saiLabelEdit(this,{bound:[20,17,202,20],caption:"No Dokumen", maxLength:50});								
		this.c_jenis = new portalui_saiLabelEdit(this,{bound:[20,13,202,20],caption:"Jenis",readOnly:true});		
		this.cb_bank = new saiCBBL(this,{bound:[20,18,222,20],caption:"Bank Sumber", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});				
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,470,20],caption:"Deskripsi", maxLength:150});								
		this.e_pyakes = new saiLabelEdit(this,{bound:[20,13,220,20],caption:"PIC Pihak Yakes", maxLength:50});		
		this.e_pmitra = new saiLabelEdit(this,{bound:[270,13,220,20],caption:"PIC Pihak Mitra", maxLength:50});		
		this.e_fax = new saiLabelEdit(this,{bound:[20,15,220,20],caption:"No Faximile", maxLength:50});				
		this.l_tgl2 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tgl Kesepakatan", underline:true});
		this.dp_d2 = new portalui_datePicker(this,{bound:[120,11,100,18]}); 
		this.l_tgl3 = new portalui_label(this,{bound:[20,12,100,18],caption:"Tgl Pelaksanaan", underline:true});
		this.dp_d3 = new portalui_datePicker(this,{bound:[120,12,100,18]}); 		
		this.cb_buat = new saiCBBL(this,{bound:[20,16,200,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2});		
		this.cb_app1 = new saiCBBL(this,{bound:[20,17,200,20],caption:"NIK App TTD1", multiSelection:false, maxLength:10, tag:2});
		this.cb_app2 = new saiCBBL(this,{bound:[20,18,200,20],caption:"NIK App TTD2", multiSelection:false, maxLength:10, tag:2});		
		this.cb_cf = new saiCBBL(this,{bound:[20,15,200,20],caption:"CashFlow", multiSelection:false, maxLength:10, tag:2});
		this.e_nilai = new saiLabelEdit(this,{bound:[710,15,200,20],caption:"Total Nilai", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});						
				
		this.p1 = new panel(this,{bound:[10,23,900,300],caption:"Daftar Bank Penerima"});
		this.sg2 = new saiGrid(this.p1,{bound:[0,20,this.p1.width-5,this.p1.height-50],colCount:6,tag:9,
		            colTitle:["Kode Bank","Bank Cabang","Rekening","Akun Bank","Keterangan","Nilai"],
					colWidth:[[5,4,3,2,1,0],[80,150,60,230,230,80]],					
					columnReadOnly:[true,[1,2,3],[0,4,5]],
					buttonStyle:[[0],[bsEllips]], 
					colFormat:[[5],[cfNilai]],checkItem:true,
					ellipsClick:[this,"doEllipsClick2"],change:[this,"doChangeCell2"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:true,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.p1,{bound:[1,this.p1.height-25,this.p1.width-1,25],buttonStyle:bsAll,grid:this.sg2});		
		this.cb1 = new portalui_checkBox(this.sgn2,{bound:[840,5,100,25],caption:"Preview",selected:true});
		
		this.rearrangeChild(10, 23);

		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
				
		setTipeButton(tbUbahHapus);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
						
			this.cb_cf.setSQL("select kode_cf, nama from neracacf where tipe = 'posting' and kode_lokasi='"+this.app._lokasi+"'",["kode_cf","nama"],false,["Kode","Nama"],"and","Daftar Arus Kas",true);
						
			var data = this.dbLib.getDataProvider("select nik,nama from karyawan where nik='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_buat.setText(line.nik,line.nama);
			} else this.cb_buat.setText("","");
			var data = this.dbLib.getDataProvider("select a.flag,b.nama from spro a inner join karyawan b on a.flag=b.nik and a.kode_lokasi=b.kode_lokasi where kode_spro='KBAPP' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_app2.setText(line.flag,line.nama);
			} else this.cb_app2.setText("","");
						
			this.cb_cf.setText("18");
			this.cb_buat.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pembuat",true);
			this.cb_app1.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK App 1",true);			
			this.cb_app2.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK App 2",true);			
		
		
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_investasi_fKbpinbukE.extend(window.childForm);
window.app_saku2_transaksi_investasi_fKbpinbukE.implement({
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
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					sql.add("delete from kas_m where no_kas = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from kas_j where no_kas = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from inv_kas_add where no_kas = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from kas_pb_d where no_kas = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					sql.add("insert into kas_m (no_kas,kode_lokasi,no_dokumen,no_bg,akun_kb,tanggal,keterangan,kode_pp,modul,jenis,periode,kode_curr,kurs,nilai,nik_buat,nik_app,tgl_input,nik_user,posted,no_del,no_link,ref1,kode_bank) values  "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_dok.getText()+"','-','"+this.akunKB+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.app._kodePP+"','KBPB','"+this.c_jenis.getText()+"','"+this.e_periode.getText()+"','IDR',1,"+parseNilai(this.e_nilai.getText())+",'"+this.cb_buat.getText()+"','"+this.cb_app1.getText()+"',getdate(),'"+this.app._userLog+"','F','-','-','"+this.cb_cf.getText()+"','-')");
					sql.add("insert into inv_kas_add (no_kas,kode_lokasi,kode_bank,kode_akun,p_yakes,p_mitra,no_fax,tgl_sepakat,tgl_pelaksana,nik_app1,nik_app2) values  "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_bank.getText()+"','"+this.akunKB+"','"+this.e_pyakes.getText()+"','"+this.e_pmitra.getText()+"','"+this.e_fax.getText()+"','"+this.dp_d2.getDateString()+"','"+this.dp_d3.getDateString()+"','"+this.cb_app1.getText()+"','"+this.cb_app2.getText()+"')");															
					
					sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank) values "+
							"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',0,'"+this.akunKB+"','"+this.e_ket.getText()+"','C',"+parseNilai(this.e_nilai.getText())+",'"+this.app._kodePP+"','-','"+this.cb_cf.getText()+"','-','"+this.app._lokasi+"','KBPB','KB','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-')");												
															
					if (this.sg2.getRowValidCount() > 0){
						var j=0;
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){
							    j = i+1;
								sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank) values "+
										"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',"+j+",'"+this.sg2.cells(3,i)+"','"+this.sg2.cells(4,i)+"','D',"+nilaiToFloat(this.sg2.cells(5,i))+",'"+this.app._kodePP+"','-','"+this.cb_cf.getText()+"','-','"+this.app._lokasi+"','KBPB','PB','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-')");
								sql.add("insert into kas_pb_d(no_urut,no_kas,kode_lokasi,periode,kode_bank,kode_akun,keterangan,nilai) values "+
										"("+j+",'"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.sg2.cells(0,i)+"','"+this.sg2.cells(3,i)+"','"+this.sg2.cells(4,i)+"',"+nilaiToFloat(this.sg2.cells(5,i))+")");
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
					this.sg2.clear(1); 
					setTipeButton(tbUbahHapus);
				break;
			case "ubah" :	
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				this.sg2.validasi();
				if (nilaiToFloat(this.e_nilai.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total Nilai tidak boleh nol atau kurang.");
					return false;						
				}
				if (parseFloat(this.perLama) < parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode transaksi sebelumnya.");
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
				else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "hapus" :	
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}	
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from kas_m where no_kas = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from kas_j where no_kas = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from inv_kas_add where no_kas = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from kas_pb_d where no_kas = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
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
	},
	doChange:function(sender){
		if (sender == this.e_periode && this.e_periode.getText()!="") {			
			this.e_nb.setSQL("select no_kas, keterangan from kas_m where no_del='-' and jenis in ('KK','BK') and modul = 'KBPB' and posted='F' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["no_kas","keterangan"],false,["No KB","Deskripsi"],"and","Daftar Bukti KB",true);
		}
		if (sender == this.e_nb && this.e_nb.getText()!="") {
			var data = this.dbLib.getDataProvider("select a.no_dokumen,convert(varchar,a.tanggal,103) as tanggal,a.periode,a.keterangan,a.jenis,a.nik_buat,a.ref1,"+
					   "c.kode_bank,b.nama as nama_bank,c.kode_akun,c.p_yakes,c.p_mitra,c.no_fax,c.tgl_sepakat,c.tgl_pelaksana,c.nik_app1,c.nik_app2 "+
			           "from kas_m a "+			           					   
					   "    inner join inv_kas_add c on a.no_kas=c.no_kas and a.kode_lokasi=c.kode_lokasi "+
					   "    inner join inv_bank b on c.kode_bank=b.kode_bank "+
					   "where a.no_kas='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.perLama = line.periode;
					this.akunKB = line.kode_akun;	
					this.dp_d1.setText(line.tanggal);
					this.c_jenis.setText(line.jenis);					
					this.e_dok.setText(line.no_dokumen);
					this.e_ket.setText(line.keterangan);
					this.cb_buat.setText(line.nik_buat);
					this.cb_app1.setText(line.nik_app1);
					this.cb_app2.setText(line.nik_app2);
					this.cb_bank.setText(line.kode_bank,line.nama_bank);
					this.e_pyakes.setText(line.p_yakes);
					this.e_pmitra.setText(line.p_mitra);
					this.e_fax.setText(line.no_fax);
					this.dp_d2.setText(line.tgl_sepakat);
					this.dp_d3.setText(line.tgl_pelaksana);					
					this.cb_cf.setText(line.ref1);						
				} 
			}						
			var strSQL = "select a.kode_bank,b.nama as nama_bank,b.no_rek+' - '+b.nama_rek as rek,a.kode_akun,a.keterangan,a.nilai from kas_pb_d a inner join inv_bank b on a.kode_bank=b.kode_bank where a.no_kas ='"+this.e_nb.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' order by a.no_urut";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg2.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg2.appendData([line.kode_bank,line.nama_bank,line.rek,line.kode_akun,line.keterangan,floatToNilai(line.nilai)]);
				}
			} else this.sg2.clear(1);						
			this.sg2.validasi();			
		}		
	},		
	doChangeCell2: function(sender, col, row){
		if (col == 5) this.sg2.validasi();		
	},
	doNilaiChange: function(){
		try{			
			var tot = 0;			
			for (var i = 0; i < this.sg2.rows.getLength();i++){
				if (this.sg2.rowValid(i) && this.sg2.cells(5,i) != ""){
					tot = tot + nilaiToFloat(this.sg2.cells(5,i));				
				}
			}
			this.e_nilai.setText(floatToNilai(tot));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},			
	doEllipsClick2: function(sender, col, row){
		try{			
			if (sender == this.sg2) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Bank",sender,undefined, 
												  "select kode_bank,nama    from inv_bank",
												  "select count(kode_bank)  from inv_bank",
												  ["kode_bank","nama"],"and",["Kode","Nama"],false);				
				}								
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doChangeCell2: function(sender, col, row){
		if ((col == 5) && (this.sg2.cells(5,row) != "")) this.sg2.validasi();
		sender.onChange.set(undefined,undefined);
	    if (col == 0) {
			if (sender.cells(0,row) != "") {
				var bank = this.dataBank.get(sender.cells(0,row));
				if (bank) {
					sender.cells(1,row,bank);					
					var data = this.dbLib.getDataProvider("select no_rek+' - '+nama_rek as rek,kode_akun from inv_bank where kode_bank='"+sender.cells(0,row)+"'",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){
							sender.cells(2,row,line.rek);
							sender.cells(3,row,line.kode_akun);
						} 
					}
					
					
				}
				else {                                    
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Bank "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkBank");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
					sender.cells(2,row,"");
					sender.cells(3,row,"");
				}				
			}
		}					
		sender.onChange.set(this,"doChangeCell2");		
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.cb1.isSelected()) {								
								this.nama_report="server_report_saku2_kb_rptKbBuktiJurnal";
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
							} 
							else {
								system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.e_nb.getText()+")","");							
								this.clearLayar();
							}
						}else system.info(this,result,"");
	    			break;
					case "getMultiDataProvider":
	    			    eval("result = "+result+";");
	    			    if (typeof result != "string"){
                            this.dataBank = new portalui_arrayMap();							
	    			        if (result.result[0]){	    			        
	    			            var line;
	    			            for (var i in result.result[0].rs.rows){
	    			                line = result.result[0].rs.rows[i];
	    			                this.dataBank.set(line.kode_bank, line.nama);
                                }
                            }							
                        }else throw result;
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
			this.sg2.clear(1); 
			setTipeButton(tbUbahHapus);
		} catch(e) {
			alert(e);
		}
	}
});