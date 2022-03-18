window.app_saku2_transaksi_kopeg_kbitt_fVerReimDRK = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_kbitt_fVerReimDRK.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_kbitt_fVerReimDRK";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Verifikasi IF (Penggantian Uang): Input", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,13,202,20],caption:"Periode",tag:2,readOnly:true, visible:false,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,13,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,13,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true,visible:false});		
		this.cb_nik = new portalui_saiCBBL(this,{bound:[20,12,222,20],caption:"Pemegang IF",tag:2,multiSelection:false,change:[this,"doChange"]}); 						
		this.cb_pp = new portalui_saiCBBL(this,{bound:[20,13,222,20],caption:"Bagian / Unit",tag:2,readOnly:true}); 								
		this.e_saldo = new saiLabelEdit(this,{bound:[820,13,202,20],caption:"Saldo IF", tag:1, tipeText:ttNilai, text:"0",readOnly:true});
		this.e_ket = new saiLabelEdit(this,{bound:[20,16,550,20],caption:"Uraian", maxLength:150});					
		this.bCari = new button(this,{bound:[720,16,80,18],caption:"Tampil Data",click:[this,"doLoad"]});			
		this.e_nilai = new saiLabelEdit(this,{bound:[820,16,202,20],caption:"Total", tag:1, tipeText:ttNilai, text:"0",readOnly:true});
		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,360], childPage:["Data Pengajuan","Data Anggaran"]});
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:11,tag:0,		            
					colTitle:["Status","Tanggal","Uraian","Nilai","Sts Pajak","Nilai Pajak","No Pengajuan","Akun","DRK","PP","NIK Sub"],
					colWidth:[[10,9,8,7,6,5,4,3,2,1,0],[200,60,60,60,90,80,80,80,260,70,70]],										
					columnReadOnly:[true,[0,1,2,3,4,6,7,8,9,10],[5]],
					buttonStyle:[[0,4],[bsAuto,bsAuto]],colFormat:[[3,5],[cfNilai,cfNilai]],
					picklist:[[0,4],[new portalui_arrayMap({items:["GANTI","INPROG"]}),new portalui_arrayMap({items:["NON","P21","P23"]})]],
					nilaiChange:[this,"doNilaiChange"],change:[this,"doChangeCells"],autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg});		
				
		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:9,tag:9,
		            colTitle:["Kode Akun","Nama Akun","Kode PP","Nama PP","Kode DRK","Nama DRK","Saldo Awal","Nilai","Saldo Akhir"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[80,80,80,150,80,150,80,150,80]],
					readOnly:true,colFormat:[[6,7,8],[cfNilai,cfNilai,cfNilai]],autoAppend:true,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});
		this.i_budget = new portalui_imageButton(this.sgn2,{bound:[955,2,20,20],hint:"Cek Anggaran",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doHitungGar"]});
		
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
			
			this.flagGarFree = "0"; this.flagDokFree = "0"; 
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('PPH21','PPH23','GARFREE','DOKFREE') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "GARFREE") this.flagGarFree = line.flag;			
					if (line.kode_spro == "DOKFREE") this.flagDokFree = line.flag;								
					if (line.kode_spro == "PPH21") this.akunPPH21 = line.flag;								
					if (line.kode_spro == "PPH23") this.akunPPH23 = line.flag;								
				}				
			}
			
			if (this.app._userStatus == "A") this.cb_pp.setSQL("select kode_pp, nama from pp where flag_aktif ='1' and tipe = 'Posting' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data Prodi/Unit",true);
			else this.cb_pp.setSQL("select kode_pp, nama from pp where kode_pp='"+this.app._kodePP+"' and flag_aktif ='1' and tipe = 'Posting' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data Prodi/Unit",true);
			this.cb_pp.setText(this.app._kodePP);
			this.cb_nik.setSQL("select a.nik, a.nama from karyawan a inner join it_if b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi where a.nik='"+this.app._userLog+"' and a.kode_lokasi='"+this.app._lokasi+"'",["a.nik","a.nama"],false,["Kode","Nama"],"and","Data Pemegang",true);
			this.cb_nik.setText(this.app._userLog);			
						
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_kbitt_fVerReimDRK.extend(window.childForm);
window.app_saku2_transaksi_kopeg_kbitt_fVerReimDRK.implement({	
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
					sql.add("insert into it_ifver_m(no_ver,kode_lokasi,periode,tanggal,nik,kode_pp,keterangan,tgl_input,nik_user,nilai,no_aju) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.cb_nik.getText()+"','"+this.cb_pp.getText()+"','"+this.e_ket.getText()+"',getdate(),'"+this.app._userLog+"',"+nilaiToFloat(this.e_nilai.getText())+",'-')");
					
					for (var i = 0; i < this.sg.rows.getLength();i++){
						if (this.sg.rowValid(i) && this.sg.cells(0,i) == "GANTI"){							
							sql.add("update it_ifaju_m set no_ver='"+this.e_nb.getText()+"' where no_bukti ='"+this.sg.cells(6,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
							
							if (this.sg.cells(4,i) != "NON") {
								var k = i+100;								
								sql.add("insert into it_ifver_j(no_ver,no_bukti,kode_lokasi,tanggal,nu,periode,kode_akun,kode_pp,kode_drk,dc,keterangan,nilai,jenis) values "+
											"('"+this.e_nb.getText()+"','"+this.sg.cells(6,i)+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.e_periode.getText()+"','"+this.sg.cells(7,i)+"','"+this.sg.cells(9,i)+"','"+this.sg.cells(8,i)+"','D','"+this.sg.cells(2,i)+"',"+nilaiToFloat(this.sg.cells(5,i))+",'"+this.sg.cells(4,i)+"')");
								
								if (this.sg.cells(4,i) == "P21") var akunPajak = this.akunPPH21; else var akunPajak = this.akunPPH23; 								
								sql.add("insert into it_ifver_j(no_ver,no_bukti,kode_lokasi,tanggal,nu,periode,kode_akun,kode_pp,kode_drk,dc,keterangan,nilai,jenis) values "+
										"('"+this.e_nb.getText()+"','"+this.sg.cells(6,i)+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"',"+k+",'"+this.e_periode.getText()+"','"+akunPajak+"','"+this.sg.cells(9,i)+"','-','C','"+this.sg.cells(2,i)+"',"+nilaiToFloat(this.sg.cells(5,i))+",'"+this.sg.cells(4,i)+"')");
							}
						}
					}																																		
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){
								if (nilaiToFloat(this.sg2.cells(7,i)) > 0) {
									var DC = "D"; 
									var nilai = nilaiToFloat(this.sg2.cells(7,i));
								} else {
									var DC = "C";
									var nilai = nilaiToFloat(this.sg2.cells(7,i)) * -1;
								}
								sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) values "+
										"('"+this.e_nb.getText()+"','IFSUBVER','"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','"+this.sg2.cells(2,i)+"','"+this.sg2.cells(4,i)+"','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','"+DC+"',"+parseNilai(this.sg2.cells(6,i))+","+nilai+")");
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
					setTipeButton(tbSimpan);
					this.pc1.setActivePage(this.pc1.childPage[0]);
					this.sg.clear(1);					
					this.sg2.clear(1);
					this.doChange(this.cb_nik);
				break;
			case "simpan" :					
				this.sg.validasi();				
				for (var i = 0; i < this.sg.rows.getLength();i++){
					if (this.sg.rowValid(i) && this.sg.cells(0,i) == "GANTI"){
						var k =i+1;
						if (this.sg.cells(4,i) != "NON" && this.sg.cells(5,i) == "0") {
							system.alert(this,"Transaksi tidak valid.","Nilai Pajak tidak boleh nol. [Baris : "+k+"]");
							return false;						
						}
					}
				}
				this.doHitungGar();
				if (this.flagGarFree == "0") {
					for (var i=0;i < this.sg2.getRowCount();i++){
						if (nilaiToFloat(this.sg2.cells(7,i))>0 && nilaiToFloat(this.sg2.cells(6,i)) < nilaiToFloat(this.sg2.cells(7,i))) {
							var k =i+1;
							system.alert(this,"Transaksi tidak valid.","Saldo Anggaran tidak mencukupi. [Baris : "+k+"]");
							return false;						
						}
					}
				}
				if (nilaiToFloat(this.e_saldo.getText()) <= nilaiToFloat(this.e_nilai.getText())) {
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
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else {
			if (m == "12") this.e_periode.setText(this.app._periode);
			else this.e_periode.setText(y+""+m);
		}
		this.doClick();
	},
	doClick:function(sender){
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"it_ifver_m","no_ver",this.app._lokasi+"-IFV"+this.e_periode.getText().substr(2,2)+".","00000"));
		this.e_ket.setFocus();
		setTipeButton(tbSimpan);
	},		
	doChange:function(sender){		
		if (sender == this.cb_nik && this.cb_nik.getText()!="") {
			var strSQL = "select d.kode_bidang,a.kode_pp,a.nilai-isnull(b.ganti,0)-isnull(c.subif,0)-isnull(e.reimburse,0) as saldo "+
			             "from it_if a inner join pp d on a.kode_pp=d.kode_pp and a.kode_lokasi=d.kode_lokasi "+						 
						 "					 left join (select a.kode_lokasi,a.nik,sum(b.nilai) as ganti "+
						 "								from it_ifver_m a inner join it_ifaju_m b on a.no_ver=b.no_ver and a.kode_lokasi=b.kode_lokasi and b.no_aju ='-' "+
						 "								where a.nik='"+this.cb_nik.getText()+"' and a.kode_lokasi ='"+this.app._lokasi+"' "+
						 "								group by a.nik,a.kode_lokasi) b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+
						 "                   left join (select nik_if,kode_lokasi,sum(nilai) as subif from it_if_sub group by kode_lokasi,nik_if) c on a.nik=c.nik_if and a.kode_lokasi=c.kode_lokasi "+
						 "			         left join (select nik_panjar,kode_lokasi,sum(nilai) as reimburse "+
					     "                              from it_aju_m where no_kas='-' and modul='HUTIF' and kode_lokasi='"+this.app._lokasi+"' and nik_panjar='"+this.cb_nik.getText()+"' "+
						 "                              group by nik_panjar,kode_lokasi) e on a.nik=e.nik_panjar and a.kode_lokasi=e.kode_lokasi "+
						 "where a.nik='"+this.cb_nik.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";						   			
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){							
					this.e_saldo.setText(floatToNilai(line.saldo));					
					this.cb_pp.setText(line.kode_pp);
					this.kodeBidang = line.kode_bidang;
				}
			}
		}
	},
	doLoad:function(sender){				
		if (this.cb_nik.getText() != "" && this.e_periode.getText() != "") {
			var data = this.dbLib.getDataProvider("select 'INPROG' as status,a.no_bukti,convert(varchar,a.tanggal,103) as tgl,a.kode_akun,a.kode_pp,a.kode_drk,a.keterangan,a.nilai,a.nik+' - '+e.nama as niksub,a.sts_pajak,a.npajak "+
					   "from it_ifaju_m a inner join karyawan e on a.nik=e.nik and a.kode_lokasi=e.kode_lokasi "+
					   "                  inner join it_if_sub x on a.nik=x.nik  and a.kode_lokasi=x.kode_lokasi "+
					   "where a.no_ver = '-' and a.no_aju='-' and a.kode_lokasi='"+this.app._lokasi+"' and x.nik_if='"+this.cb_nik.getText()+"' and a.periode<='"+this.e_periode.getText()+"'",true);					   
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];													
					this.sg.appendData([line.status.toUpperCase(),line.tgl,line.keterangan,floatToNilai(line.nilai),line.sts_pajak,floatToNilai(line.npajak),line.no_bukti,line.kode_akun,line.kode_drk,line.kode_pp,line.niksub]);
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
				if (this.sg.rowValid(i) && this.sg.cells(3,i) != "" && this.sg.cells(0,i) == "GANTI"){
					tot += nilaiToFloat(this.sg.cells(3,i));					
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
							this.pc1.hide();
						}
						else {													
							if (result.toLowerCase().search("primary key") == -1){
								alert(error);
							}
							else this.simpan();						   						
						}						
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
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);						
			setTipeButton(tbSimpan);
			this.pc1.setActivePage(this.pc1.childPage[0]);
			this.sg.clear(1);			
			this.sg2.clear(1);
			this.doChange(this.cb_nik);
		} catch(e) {
			alert(e);
		}
	},		
	doHitungGar: function(){		
		this.sg2.clear();
		var nilai = total = 0;
		for (var i=0;i < this.sg.getRowCount();i++){
			if (this.sg.rowValid(i) && this.sg.cells(4,i) != "NON" && this.sg.cells(9,i) != "-" && this.sg.cells(8,i)!= "-"){
				nilai = nilaiToFloat(this.sg.cells(5,i));				
				
				var isAda = false;
				var idx = total = 0;
				for (var j=0;j < this.sg2.getRowCount();j++){
					if (this.sg.cells(7,i) == this.sg2.cells(0,j) && this.sg.cells(9,i) == this.sg2.cells(2,j) && this.sg.cells(8,i) == this.sg2.cells(4,j)) {
						isAda = true;
						idx = j;
						break;
					}
				}
				if (!isAda) {
					this.sg2.appendData([this.sg.cells(7,i),this.sg.cells(7,i),this.sg.cells(9,i),this.sg.cells(9,i),this.sg.cells(8,i),this.sg.cells(8,i),"0",floatToNilai(nilai),"0"]);
				} 
				else { 
					total = nilaiToFloat(this.sg2.cells(7,idx));
					total = total + nilai;
					this.sg2.setCell(7,idx,total);
				}
			}
		}
		var sls = 0;
		for (var i=0;i < this.sg2.getRowCount();i++){
			var data = this.dbLib.getDataProvider("select fn_cekagg2('"+this.sg2.cells(2,i)+"','"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','"+this.sg2.cells(4,i)+"','"+this.e_periode.getText()+"') as gar ",true);			
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];
				data = line.gar.split(";");
				sls = parseFloat(data[0]) - parseFloat(data[1]);
				this.sg2.cells(6,i,floatToNilai(sls));
				sls = sls - nilaiToFloat(this.sg2.cells(7,i));
				this.sg2.cells(8,i,floatToNilai(sls));
			}
		}
	}	
});