window.app_saku3_transaksi_siaga_fSchGen = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_siaga_fSchGen.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_siaga_fSchGen";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Jurnal Umum", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Jurnal","List Jurnal"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:5,tag:9,
		            colTitle:["No Bukti","Tanggal","No Dokumen","Deskripsi","Nilai"],
					colWidth:[[4,3,2,1,0],[100,490,180,80,100]],colFormat:[[4],[cfNilai]],
					readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});				
		
		this.cb_buat = new saiCBBL(this.pc2.childPage[0],{bound:[20,15,220,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2});				
		this.cb_app = new saiCBBL(this.pc2.childPage[0],{bound:[20,14,220,20],caption:"NIK Mengetahui", multiSelection:false, maxLength:10, tag:2});				
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,16,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,18,450,20],caption:"Deskripsi", maxLength:150});
		this.e_total = new saiLabelEdit(this.pc2.childPage[0],{bound:[780,18,210,20],caption:"Total", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.bTampil = new portalui_button(this.pc2.childPage[0],{bound:[509,18,80,18],caption:"Tampil Data",click:[this,"doTampilClick"]});		

		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,12,995,302], childPage:["Data Item Jurnal","Data Anggaran"]});
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:6,tag:0,
		            colTitle:["No Kartu","Deskripsi","Akun Beban","Akun BMHD","Nilai","Periode"],
					colWidth:[[5,4,3,2,1,0],[80,100,100,100,300,150]],					
					columnReadOnly:[true,[0,1,2,3,4],[]],					
					colFormat:[[4],[cfNilai]],
					nilaiChange:[this,"doNilaiChange"],
					autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});		
		
		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:5,tag:9,
		            colTitle:["Kode Akun","Nama Akun","Saldo Awal","Nilai","Saldo Akhir"],
					colWidth:[[4,3,2,1,0],[100,100,100,500,100]],
					readOnly:true,colFormat:[[2,3,4],[cfNilai,cfNilai,cfNilai]],autoAppend:true,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});
		this.i_budget = new portalui_imageButton(this.sgn2,{bound:[955,2,20,20],hint:"Cek Budget",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doHitungGar"]});		
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		

		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		this.dataAkun = this.app._masakun;
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);					
			
			this.cb_buat.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pembuat",true);			
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Mengetahui",true);			
					
			var data = this.dbLib.getDataProvider("select nik,nama from karyawan where nik='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_buat.setText(line.nik,line.nama);
			} else this.cb_buat.setText("","");			
			var data = this.dbLib.getDataProvider("select a.flag,b.nama from spro a inner join karyawan b on a.flag=b.nik and a.kode_lokasi=b.kode_lokasi where kode_spro='JUAPP' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_app.setText(line.flag,line.nama);
			} else this.cb_app.setText("","");			
			this.flagGarFree = "0"; 
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('GARFREE') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "GARFREE") this.flagGarFree = line.flag;								
				}
			}	
					
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_siaga_fSchGen.extend(window.childForm);
window.app_saku3_transaksi_siaga_fSchGen.implement({
	doTampilClick: function(sender){
		try{			
			if (this.e_periode.getText() != "") {
				this.sg.clear(1);
				
				var strSQL = "select a.no_kartu,a.keterangan,a.akun_beban,a.akun_hutang,b.nilai,b.periode "+
							 "from gr_kartu_m a inner join gr_kartu_sch b on a.no_kartu=b.no_kartu and a.kode_lokasi=b.kode_lokasi and b.no_bill='-' "+
							 "where b.periode<='"+this.e_periode.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"' order by a.no_kartu,a.periode";								   		

				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData([line.no_kartu,line.keterangan,line.akun_beban,line.akun_hutang,floatToNilai(line.nilai),line.periode]);
					}
				} else this.sg.clear(1);							
			} 

		}catch(e){
			systemAPI.alert(e);
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
			if (this.stsSimpan == 1) this.doClick();
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.stsSimpan == 0) {
						sql.add("delete from ju_m where no_ju='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");
						sql.add("delete from ju_j where no_ju='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");
						sql.add("delete from angg_r where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");

						sql.add("update gr_kartu_sch set no_bill='-' where no_bill='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");
					}
					
					sql.add("insert into ju_m(no_ju,kode_lokasi,periode,tanggal,no_dokumen,keterangan,kode_pp,modul,jenis,kode_curr,kurs,nilai,nik_buat,nik_setuju,posted,no_del,no_link,ref1,tgl_input,nik_user) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','-','"+this.e_ket.getText()+"','-','JUSCH','JU','IDR',1,"+parseNilai(this.e_total.getText())+",'"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"','F','-','-','-',getdate(),'"+this.app._userLog+"')");
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								var j = 1000+i;
								sql.add("update gr_kartu_sch set no_bill='"+this.e_nb.getText()+"' where no_bill='-' and periode ='"+this.sg.cells(5,i)+"' and no_kartu='"+this.sg.cells(0,i)+"' and kode_lokasi='"+this.app._lokasi+"' ");
								
								sql.add("insert into ju_j(no_ju,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,no_ref,ket_ref) values "+
										"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg.cells(2,i)+"','"+this.sg.cells(1,i)+"','D',"+parseNilai(this.sg.cells(4,i))+",'"+this.app._kodePP+"','-','-','-','-','-','-','-','"+this.app._lokasi+"','JUSCH','BEBAN','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-','-')");
								sql.add("insert into ju_j(no_ju,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,no_ref,ket_ref) values "+
										"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',"+j+",'"+this.sg.cells(3,i)+"','"+this.sg.cells(1,i)+"','C',"+parseNilai(this.sg.cells(4,i))+",'"+this.app._kodePP+"','-','-','-','-','-','-','-','"+this.app._lokasi+"','JUSCH','BMHD','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-','-')");
							}
						}
					}
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){
								if (nilaiToFloat(this.sg2.cells(3,i)) > 0) {
									var DC = "D"; 
									var nilai = nilaiToFloat(this.sg2.cells(3,i));
								} else {
									var DC = "C";
									var nilai = nilaiToFloat(this.sg2.cells(3,i)) * -1;
								}
								sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) values "+
										"	('"+this.e_nb.getText()+"','JU','"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','-','-','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','"+DC+"',"+parseNilai(this.sg2.cells(2,i))+","+nilai+")");
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
					this.sg.clear(1); this.sg2.clear(1);					
					this.pc1.setActivePage(this.pc1.childPage[0]);
					setTipeButton(tbSimpan);
				break;
			case "simpan" :	
			case "ubah" :	
				this.preView = "1";					
				this.dataAkunGar = {rs:{rows:[]}};	
				var data = this.dbLib.getDataProvider("select kode_akun from masakun where status_gar = '1' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataAkunGar = data;
				}
				for (var i=0;i < this.sg.getRowCount();i++){					
					if (!this.sg.rowValid(i)){
						var isKosong = true;
						for (var j=0;j < this.sg.getColCount();j++){
							if (this.sg.cells(j,i) != "") {
								isKosong = false;
								break;
							}
						}						
						if (!isKosong) {
							system.alert(this,"Transaksi tidak valid.","Terdapat kolom yang kosong.");
							return false;
						}
					}					
				}
				this.sg.validasi();
				var data = this.dbLib.getDataProvider("select kode_akun from flag_relasi where kode_flag in ('001','009') and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
				} 						
				var k=0;
				for (var j=0;j < this.sg.getRowCount();j++){
					if (this.sg.rowValid(j)){
						for (var i=0;i<this.dataJU.rs.rows.length;i++){
							line = this.dataJU.rs.rows[i];
							if (line.kode_akun == this.sg.cells(0,j)) {		
								k = j+1;
								system.alert(this,"Transaksi tidak valid.","Akun KasBank tidak diperkenankan.[Baris : "+k+"]");
								return false;						
							}
						}													
					}
				}					
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);											
				this.sg.validasi();
				this.doHitungGar();				
				if (this.flagGarFree == "0") {					
					for (var i=0;i < this.sg2.getRowCount();i++){
						for (var j=0;j<this.dataAkunGar.rs.rows.length;j++) {
							var line = this.dataAkunGar.rs.rows[j];
							if (line.kode_akun == this.sg2.cells(0,i)) {		
								if (nilaiToFloat(this.sg2.cells(3,i))>0 && nilaiToFloat(this.sg2.cells(2,i)) < nilaiToFloat(this.sg2.cells(3,i))) {
									var k =i+1;
									system.alert(this,"Transaksi tidak valid.","Saldo Anggaran tidak mencukupi. [Baris : "+k+"]");
									return false;						
								}							
							}
						}
					}
				}
				
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total tidak boleh nol atau kurang.");
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
				this.preView = "0";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}	
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from ju_m where no_ju='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");
					sql.add("delete from ju_j where no_ju='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");
					sql.add("delete from angg_r where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");
					
					sql.add("update gr_kartu_sch set no_bill='-' where no_bill='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
				break;			
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12){
			this.e_periode.setText(y+""+m);
			if (m=="01") this.Aperiode = "A";
			if (m=="02") this.Aperiode = "B";
			if (m=="03") this.Aperiode = "C";
			if (m=="04") this.Aperiode = "D";
			if (m=="05") this.Aperiode = "E";
			if (m=="06") this.Aperiode = "F";
			if (m=="07") this.Aperiode = "G";
			if (m=="08") this.Aperiode = "H";
			if (m=="09") this.Aperiode = "I";
			if (m=="10") this.Aperiode = "J";
			if (m=="11") this.Aperiode = "K";
			if (m=="12") this.Aperiode = "L";			
		}
		else {
			this.e_periode.setText(this.app._periode);		
			if (m=="13") this.Aperiode = "M";			
			if (m=="14") this.Aperiode = "N";			
			if (m=="15") this.Aperiode = "O";			
			if (m=="16") this.Aperiode = "P";						
		}
		
		if (this.stsSimpan == 1) this.doClick();
	},	
	doClick:function(sender){
		if (this.stsSimpan == 0) {
			this.sg.clear(1); this.sg2.clear(1); this.sg3.clear(1);			
		}
		
		if (this.e_periode.getText()!= "") {									
			var AddFormat = "/"+this.Aperiode+"/MEMO/"+this.e_periode.getText().substr(2,2);					
			var data = this.dbLib.getDataProvider("select isnull(max(no_ju),0) as no_ju from ju_m where no_ju like '___"+AddFormat+"%' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					if (line.no_ju == "0") this.e_nb.setText("001"+AddFormat);
					else {
						var idx = parseFloat(line.no_ju.substr(0,3)) + 1;
						idx = idx.toString();
						if (idx.length == 1) var nu = "00"+idx;
						if (idx.length == 2) var nu = "0"+idx;
						if (idx.length == 3) var nu = idx;
						this.e_nb.setText(nu+AddFormat);						
					}
				} 
			}
			this.e_ket.setFocus();
		}
	},	
	doNilaiChange: function(){
		try{
			var tot =  0;			
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(4,i) != ""){					
					tot += nilaiToFloat(this.sg.cells(4,i));					
				}
			}
			this.e_total.setText(floatToNilai(tot));			
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},	
	doHitungGar: function(){
		this.sg2.clear();
		var nilai = total = 0;
		for (var i=0;i < this.sg.getRowCount();i++){
			if (this.sg.rowValid(i) ){				
				nilai = nilaiToFloat(this.sg.cells(4,i));
				
				var isAda = false;
				var idx = total = 0;
				for (var j=0;j < this.sg2.getRowCount();j++){
					if (this.sg.cells(2,i) == this.sg2.cells(0,j)) {
						isAda = true;
						idx = j;
						break;
					}
				}
				if (!isAda) {
					var akun = this.dataAkun.get(this.sg.cells(2,i));
					if (akun) var namaAkun = akun;				
					
					this.sg2.appendData([this.sg.cells(2,i),namaAkun,"0",floatToNilai(nilai),"0"]);
				} 
				else { 
					total = nilaiToFloat(this.sg2.cells(3,idx));
					total = total + nilai;
					this.sg2.setCell(3,idx,total);
				}
			}
		}
		
		var sls = 0;
		for (var i=0;i < this.sg2.getRowCount();i++){
			if (this.stsSimpan == 1) var data = this.dbLib.getDataProvider("select fn_cekagg7('"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','"+this.e_periode.getText()+"') as gar ",true);
			else var data = this.dbLib.getDataProvider("select fn_cekagg8('"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','"+this.e_periode.getText()+"','"+this.e_nb.getText()+"') as gar ",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];
				data = line.gar.split(";");
				sls = parseFloat(data[0]) - parseFloat(data[1]);
				this.sg2.cells(2,i,floatToNilai(sls));
				sls = sls - nilaiToFloat(this.sg2.cells(3,i));
				this.sg2.cells(4,i,floatToNilai(sls));
			}
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {								
								this.nama_report="server_report_saku3_siaga_rptSchJurnal";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_ju='"+this.e_nb.getText()+"' ";
								this.filter2 = this.e_periode.getText();
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
			this.sg.clear(1); this.sg2.clear(1);
			this.pc1.setActivePage(this.pc1.childPage[0]);	
			setTipeButton(tbSimpan);
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){																		
		var strSQL = "select no_ju,convert(varchar,a.tanggal,103) as tgl,a.no_dokumen,a.keterangan,a.nilai "+
		             "from ju_m a "+					 					 
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.posted ='F' and a.modul='JUSCH'";		
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
			this.sg3.appendData([line.no_ju,line.tgl,line.no_dokumen,line.keterangan,floatToNilai(line.nilai)]); 
		}
		this.sg3.setNoUrut(start);
		this.page3 = 0;
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
		this.page3 = page - 1;
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[0]);																		
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;		

				//var baris = (this.page3 * 20) + row; 		
				//this.e_nb.setText(this.sg3.cells(0,baris));								

				this.e_nb.setText(this.sg3.cells(0,row));
				
				var data = this.dbLib.getDataProvider("select * "+
						   "from ju_m a "+
						   "where a.no_ju='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.perLama = line.periode;
						this.dp_d1.setText(line.tanggal);					
						this.e_ket.setText(line.keterangan);
						this.cb_buat.setText(line.nik_buat);										
						this.cb_app.setText(line.nik_setuju);										
					} 
				}	
				
				
				var strSQL = "select a.no_kartu,a.keterangan,a.akun_beban,a.akun_hutang,b.nilai,b.periode "+
							 "from gr_kartu_m a inner join gr_kartu_sch b on a.no_kartu=b.no_kartu and a.kode_lokasi=b.kode_lokasi "+
							 "where b.no_bill='"+this.e_nb.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"'";								   		

				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData([line.no_kartu,line.keterangan,line.akun_beban,line.akun_hutang,floatToNilai(line.nilai),line.periode]);
					}
				} else this.sg.clear(1);							
				

				var data = this.dbLib.getDataProvider(
							"select a.kode_akun,b.nama as nama_akun,a.saldo,a.nilai,a.saldo-a.nilai as sakhir "+
							"from angg_r a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
							"where a.no_bukti = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul='JU' order by a.kode_akun",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg2.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg2.appendData([line.kode_akun,line.nama_akun,floatToNilai(line.saldo),floatToNilai(line.nilai),floatToNilai(line.sakhir)]);
					}
				} else this.sg2.clear(1);	
					
			}									
		} catch(e) {alert(e);}
	}
});