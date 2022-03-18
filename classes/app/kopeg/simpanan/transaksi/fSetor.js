window.app_kopeg_simpanan_transaksi_fSetor = function(owner)
{
	if (owner)
	{
		window.app_kopeg_simpanan_transaksi_fSetor.prototype.parent.constructor.call(this,owner);
		this.className  = "app_kopeg_simpanan_transaksi_fSetor";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Setoran Angsuran Simpanan: Input", 0);	
		
		uses("portalui_saiCBBL;portalui_saiEdit;portalui_datePicker;portalui_saiGrid;portalui_checkBox;portalui_reportViewer");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,200,20],caption:"Periode",readOnly:true,tag:2});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()});
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,13,250,20],caption:"No Setoran",maxLength:30,readOnly:true});
		this.b_gen = new portalui_button(this,{bound:[280,13,80,18],caption:"Gen",click:[this,"doClick"],icon:"icon/"+system.getThemes()+"/process.png"});		
		this.e_dok = new portalui_saiLabelEdit(this,{bound:[20,14,343,20],caption:"No Dokumen", maxLength:100});		
		this.e_desc = new portalui_saiLabelEdit(this,{bound:[20,15,343,20],caption:"Keterangan", maxLength:150});						
		this.cb_preview = new portalui_checkBox(this,{bound:[820,15,100,20],caption:"Preview", checked:true});
		this.cb_app = new portalui_saiCBBL(this,{bound:[20,16,200,20],caption:"Penyetor",tag:2, multiSelection:false,
			sql:["select nik, nama from karyawan where kode_lokasi ='"+this.app._lokasi+"' ", ["nik","nama"],false,["NIK","Nama"],"and","Daftar Pemohon",true]
		});		
		this.bTampil = new portalui_button(this,{bound:[620,16,80,18],caption:"Tampil",click:[this,"doTampilClick"]});		
		this.e_tot = new portalui_saiLabelEdit(this,{bound:[720,16,200,20],caption:"Total Setoran",tipeText:ttNilai,readOnly: true, tag:1,text:"0"});
		
		this.p1 = new portalui_panel(this,{bound:[20,30,900,330],caption:"Daftar Angsuran Simpanan"});
		this.sg = new portalui_saiGrid(this.p1,{bound:[0,20,895,305],colCount:10,tag:2,colTitle:["Status","No Angsuran","Tanggal","Penerima","Keterangan","Periode","Piut. Temp.","Jenis","Nilai OE","Nilai Angsuran"],
					colWidth:[[0,1,2,3,4,5,6,7,8,9],[70,90,70,80,180,60,60,60,80,100]],colFormat:[[8,9],[cfNilai,cfNilai]],buttonStyle:[[0],[bsAuto]], 
					picklist:[[0],[new portalui_arrayMap({items:["SETOR","BELUM"]})]],
					columnReadOnly:[true,[1,2,3,4,5,6,7,8,9],[0]],change:[this,"doChangeCell"],autoAppend:false,
					defaultRow:1,nilaiChange:[this,"doSgChange"], dblClick:[this,"doubleClick"]});
		this.p2 = new portalui_panel(this,{bound:[20,31,900,330],caption:"Daftar Simpanan terangsur"});
		this.p2.sg = new portalui_saiGrid(this.p2,{bound:[0,20,895,305],colCount:5,tag:2,colTitle:["Kode Agg","Nama Agg","No Simpanan","Keterangan","Nilai Simpanan"],
					colWidth:[[4,3,2,1,0],[100,120,150,200,100]],colFormat:[[4],[cfNilai]],
					readOnly:true,
					defaultRow:1,tag:9});				
		
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});		
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);			
		
		this.rearrangeChild(10, 22);
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		
		try{			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			/*
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro = 'SIMPST' and kode_lokasi = '"+this.app._lokasi+"' "); 
			eval("data = "+data+";");
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];												
					if (line.kode_spro == "SIMPST") this.akunTAK = line.flag;
				}
			}
			*/
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_kopeg_simpanan_transaksi_fSetor.extend(window.portalui_childForm);
window.app_kopeg_simpanan_transaksi_fSetor.implement({
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
					//TIDAK DIPOSTINGKAN ........ >>>>>   JURNAL SEBELAH [UTK akun kredit  DI MENU KB MASUK]
					this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kop_simpsetor_m","no_setor",this.app._lokasi+"-SS"+this.e_periode.getText().substr(2,4)+".","0000"));
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into kop_simpsetor_m(no_setor,no_dokumen,keterangan,tanggal,nilai,modul,periode,kode_lokasi,nik_app,kode_curr,kurs,kode_pp,progress,no_del,no_link,nik_user,tgl_input,akun_tak,posted) values  "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.e_desc.getText()+"','"+this.dp_d1.getDateString()+"',"+parseNilai(this.e_tot.getText())+",'SIMP','"+this.e_periode.getText()+"','"+this.app._lokasi+"','"+this.cb_app.getText()+"','IDR',1,'"+this.app._kodePP+"','0','-','-','"+this.app._userLog+"',now(),'-','X')"); //akun tak  <-------- "+this.akunTAK+"
					var idx = 0;
					/*
					sql.add("insert into kop_simpsetor_j (no_setor,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+	
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+idx+",'"+this.akunTAK+"','"+this.e_desc.getText()+"','D',"+parseNilai(this.e_tot.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','SIMP','TAK','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',now())");
					*/
					this.createJurnal();
					var d="insert into kop_simpsetor_j (no_setor,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values ";
					var z = 0;
					for (var i in this.dataJurnal.rs.rows){
						line = this.dataJurnal.rs.rows[i];
						if (line.nilai != 0) {
							if (z >0) d+=",";
							idx++;
							d+="('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+idx+",'"+line.kode_akun+"','"+this.e_desc.getText()+"','"+line.dc+"',"+line.nilai+",'"+line.kode_pp+"','"+line.kode_drk+"','"+this.app._lokasi+"','SIMP','ANGS_AR','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',now())";
							z++;
						}
					}
					sql.add(d);
					
					var s="insert into kop_simpsetor_d (no_setor,no_angs,akun_ar,jenis,nilai_sls,nilai,kode_lokasi,dc) values ";
					var z = 0;
					var vAngs = false; var vInv = false;
					var nosimpangs = [];
					var nosimpinv = [];
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i)){
							if (this.sg.cells(0,i) == "SETOR") {
								if (z > 0) s+= ",";
								s+="('"+this.e_nb.getText()+"','"+this.sg.cells(1,i)+"','"+this.sg.cells(6,i)+"','"+this.sg.cells(7,i)+"',"+parseNilai(this.sg.cells(8,i))+","+parseNilai(this.sg.cells(9,i))+",'"+this.app._lokasi+"','D')";
								z++;
								if (this.sg.cells(7,i) == "ANS") {vAngs = true; nosimpangs.push("'"+this.sg.getCell(1,i)+"'"); }
								else {vInv = true; nosimpinv.push("'"+this.sg.getCell(1,i)+"'"); }
							}
						}
					}						
					sql.add(s);
					if (vAngs) sql.add("update kop_simpangs_m set progress ='1' where no_angs in ("+nosimpangs+") and kode_lokasi = '"+this.app._lokasi+"'");
					if (vInv) sql.add("update kop_simpinv_m set progress ='1' where no_inv in ("+nosimpinv+") and kode_lokasi = '"+this.app._lokasi+"'");
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
					this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);		
					this.sg.clear(1);
				}
				break;
			case "simpan" :	
				if (nilaiToFloat(this.e_tot.getText() <= 0)){
					system.alert(this,"Transaksi tidak valid.","Nilai setoran tidak boleh kurang atau sama dengan nol.");
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
		}
	},
	doClick:function(sender){
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kop_simpsetor_m","no_setor",this.app._lokasi+"-SS"+this.e_periode.getText().substr(2,4)+".","0000"));		
		    this.e_dok.setFocus();
	},
	doTampilClick: function(sender){
		try{			
			if (this.e_periode.getText() != ""){
				var data = this.dbLib.getDataProvider("select a.no_angs,date_format(a.tanggal,'%d/%m/%Y') as tanggal,b.nama,a.keterangan,a.nilai,a.akun_ar,a.periode, "+
												      "      (case when a.nilai_sls <0 then -a.nilai_sls else 0 end) as beban,'ANS' as jenis "+
													  "from  kop_simpangs_m a inner join karyawan b on a.nik_app=b.nik and a.kode_lokasi=b.kode_lokasi "+
													  "where a.nilai<> 0 and a.progress='0' and a.no_del='-' and a.periode <= '"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
													  "union "+
													  "select x.no_inv as no_angs,date_format(x.tanggal,'%d/%m/%Y') as tanggal,y.nama,x.keterangan,x.nilai,x.akun_ar,x.periode, "+
												      "      0 as beban,'INV' as jenis "+
													  "from  kop_simpinv_m x inner join karyawan y on x.nik_app=y.nik and x.kode_lokasi=y.kode_lokasi "+
													  "where x.progress='0' and x.no_del='-' and x.periode <= '"+this.e_periode.getText()+"' and x.kode_lokasi='"+this.app._lokasi+"'");				
				eval("data = "+data+";");
				if (typeof data == "object"){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData(["SETOR",line.no_angs,line.tanggal,line.nama,line.keterangan,line.periode,line.akun_ar,line.jenis.toUpperCase(),floatToNilai(line.beban),floatToNilai(line.nilai)]);
					}
					this.sg.validasi();
				}
			}
			else {
				system.alert(this,"Periode tidak valid.","Periode harus dipilih.");
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doBtnClick: function(sender, event){
		try{
			if (sender == this.cb_app) {   
			    this.standarLib.showListData(this, "Daftar Karyawan Penerima",sender,undefined, 
											  "select nik, nama  from karyawan where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(nik) from karyawan where kode_lokasi='"+this.app._lokasi+"'",
											  ["nik","nama"],"and",["NIK","Nama"],false);				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);
		this.e_nb.setText("");
	},
	doChangeCell: function(sender, col, row){
		if ((col == 0) && (this.sg.getCell(0,row) != "")){
			this.sg.validasi();
		}
	},
	doSgChange: function(sender, col, row){
		var tot1 = 0;			
		for (var i = 0;i < this.sg.getRowCount();i++){
			if ((this.sg.cells(0,i) == "SETOR")&&(this.sg.cells(9,i) != ""))
				tot1 += nilaiToFloat(this.sg.cells(9,i));
		}
		this.e_tot.setText(floatToNilai(tot1));
	},
	createJurnal: function(){		
		try{
			var rows = [];
			for (var i=0;i < this.sg.getRowCount();i++){
				if (this.sg.cells(0,i) == "SETOR"){
					var temu = false;
					for (var j in rows){
						if (rows[j].kode_akun == this.sg.cells(6,i)) {
							rows[j].nilai += nilaiToFloat(this.sg.cells(9,i));
							temu = true;
						}
					}
					if (!temu){
						rows[rows.length] = {kode_akun:this.sg.cells(6,i),nama:'-',dc:"C", keterangan: "-", nilai: nilaiToFloat(this.sg.cells(9,i)),kode_pp:this.app._kodePP, kode_drk:'-'};
					}
				}
			} 
			this.dataJurnal = {rs: { 	rows:rows,
										fields : { 	kode_akun : {type:"S",length:80},
													nama :{type:"S",length:200},
													dc:{type:"S",length:50},
													keterangan:{type:"S",length:200},
													nilai:{type:"N", length:100},
													kode_pp:{type:"S",length:100},
													kode_drk:{type:"S",length:100}
											}
								   }
							};		
		}catch(e){
			system.alert(this,e,"");
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){							
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (No : "+ this.e_nb.getText()+")");							
							if (this.cb_preview.isChecked()){
								this.previewReport(this.e_nb.getText());
							}else this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
	      		break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},
	dblClick: function(sender, col, row){
		var line,data = this.dbLib.getDataProvider("select a.no_simp, a.kode_agg, b.nama, d.keterangan, a.nilai "+
			" from kop_simp_m a inner join kop_agg b on b.kode_agg = a.kode_agg and b.kode_lokasi = a.kode_lokasi "+
			" inner join kop_simpangs_d c on c.no_simp = a.no_simp and c.kode_lokasi = a.kode_lokasi "+
			" inner join kop_simpangs_m d on d.no_angs = c.no_angs and d.kode_lokasi = a.kode_lokasi "+
			" where d.no_angs = '"+sender.cells(1,row)+"' ");
		this.p2.sg.clear();
		for (var i in data.rs.rows){
			line = data.rs.rows[i];
			this.p2.sg.appendData([line.kode_agg, line.nama, line.no_simp, line.keterangan, floatToNilai(line.nilai)]);
		}
	},
	previewReport: function(nb){
		this.title = new server_util_arrayList({items:["No. Angsuran","Tanggal","Penerima","Keterangan","Jenis","Nilai OE","Kode Agg","Nama Agg","No Kontrak","Nilai Angsuran"]});
		this.widthTable = new server_util_arrayList({items:[80,50,70,150,50,50,100,250,100,100]});
		this.fieldType = new server_util_arrayList({items:["S","S","S","S","S","N","S","S","S","N"]});															
		this.viewer.prepare();
		this.viewer.setVisible(true);
		this.app._mainForm.pButton.setVisible(false);
		this.app._mainForm.reportNavigator.setVisible(true);
		this.viewer.setTotalPage(1);
		this.app._mainForm.reportNavigator.setTotalPage(1);
		this.app._mainForm.reportNavigator.rearrange();
		this.sqlDet = "select a.no_setor,date_format(a.tanggal,'%e/%m/%Y') as tgl,a.no_dokumen,a.keterangan,e.nama as nm,a.nilai as tot, "+
							"b.no_angs,date_format(c.tanggal,'%e/%m/%Y') as tgl2,d.nama as nmapp,c.keterangan as ket,b.jenis,b.nilai_sls,h.kode_agg, g.nama as nm_agg, f.no_simp, sum(f.nilai) as nilai "+
							"from kop_simpsetor_m a inner join kop_simpsetor_d b on a.no_setor=b.no_setor and a.kode_lokasi=b.kode_lokasi and a.no_del='-' and b.dc='D' "+
							"inner join kop_simpangs_m c on b.no_angs=c.no_angs and b.kode_lokasi=c.kode_lokasi "+
							"inner join kop_simpangs_d f on b.no_angs=f.no_angs and b.kode_lokasi=f.kode_lokasi "+
							"inner join kop_simp_m h on h.no_simp=f.no_simp and b.kode_lokasi=h.kode_lokasi "+
							"inner join kop_agg g on h.kode_agg=g.kode_agg and b.kode_lokasi=g.kode_lokasi "+							
							"inner join karyawan d on c.nik_app=d.nik and c.kode_lokasi=d.kode_lokasi "+
							"inner join karyawan e on a.nik_app=e.nik and a.kode_lokasi=e.kode_lokasi ";
		var result  = this.dbLib.getDataProvider(this.sqlDet + " where a.no_setor in ('"+nb+"') "+			
			" and a.kode_lokasi = '"+this.app._lokasi+"' "+
			" group by a.no_setor, a.tanggal, a.no_dokumen, a.keterangan, e.nama, a.nilai, b.no_angs, c.tanggal, d.nama, c.keterangan, b.jenis, b.nilai_sls, h.kode_agg, g.nama, f.no_simp "+
			" order by a.no_setor, b.no_angs ", true);		
		var table = result;
		var htmlHeader="",first = true;
		var no_bill = "";
		var retHtml = "";
		var html = "";
		var table, line, urut=0,total;
		for (var r in table.rs.rows){
			line = table.rs.rows[r];
			if (no_bill != line.no_setor){
				first = true;
				no_bill = line.no_setor;
				if (htmlHeader !== ""){
					html+="<tr align='right' bgcolor='#EEEEEE'><td class='isi_laporan' colspan='10'>Total Setoran</td>"+
						"<td class='isi_laporan'>"+floatToNilai(total)+"</td></tr>";
					html += "</table>";		 
					retHtml += "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>"+
						"<tr><td>"+htmlHeader+"</td></tr>"+
						"<tr><td>"+html+"</td></tr></table></br></br>";				
				}
			}
			if (first){
				urut=0;
				total=0;
				html = "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>"+
					"<tr bgcolor='#cccccc'>"+
							"<td class='header_laporan' align='center' width=25>No</td>";
				for (var i in this.title.objList)
					html += "<td class='header_laporan' align='center' width="+this.widthTable.get(i)+">"+this.title.get(i)+"</td>";
				html += "</tr>";
				htmlHeader = "<table border='0' cellspacing='0' cellpadding='0'>";
				htmlHeader += "<tr>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>No. Setoran</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>:</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>"+line.no_setor+"</td>";
				htmlHeader += "</tr>";
				htmlHeader += "<tr>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>Tanggal</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>:</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>"+line.tgl+"</td>";
				htmlHeader += "</tr>";
				htmlHeader += "<tr>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>No. Dokumen</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>:</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>"+line.no_dokumen+"</td>";
				htmlHeader += "</tr>";
				htmlHeader += "<tr>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>Keterangan</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>:</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>"+line.keterangan+"</td>";
				htmlHeader += "</tr>";
				htmlHeader += "<tr>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>Penyetor</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>:</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>"+line.nm+"</td>";
				htmlHeader += "</tr>";
				htmlHeader += "<tr>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>Total Setoran</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>:</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>"+floatToNilai(line.tot)+"</td>";
				htmlHeader += "</tr>";
				htmlHeader += "</table>";
			}
			urut+=1;
			html += "<tr><td height='20' class='isi_laporan' valign='top'>"+urut+".</td>";
			for (var c in line){
				if (c === "no_angs" || c === "tgl2" || c === "nmapp" || c === "ket" || c === "jenis" || c === "nilai_sls" || c === "nilai" || c == "kode_agg" || c == "nm_agg" || c == "no_simp" || c == "nilai_simp"){
					if (c === "nilai_sls" || c === "nilai" || c == "nilai_simp")
						html += "<td height='20' class='isi_laporan' align='right' valign='top' >"+floatToNilai(line[c])+"</td>";
					else html += "<td height='20' class='isi_laporan' valign='top' >"+line[c]+"</td>";
				}
			}
			total+= parseFloat(line.nilai);
			html += "</tr>";
			first = false;
		}		
		html+="<tr align='right' bgcolor='#EEEEEE'><td class='isi_laporan' colspan='10'>Total Setoran</td>"+
				"<td class='isi_laporan'>"+floatToNilai(total)+"</td></tr>";
		if (htmlHeader !== ""){
			retHtml += "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>"+
				"<tr><td>"+htmlHeader+"</td></tr>"+
				"<tr><td>"+html+"</td></tr></table>";				
		}
		this.previewHtml(retHtml);
	},
	doCloseReportClick: function(sender)
	{
		switch(sender.getName())
		{			
			default :
				this.viewer.setVisible(false);
				this.app._mainForm.pButton.setVisible(true);
				this.app._mainForm.reportNavigator.setVisible(false);  
				this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);						
			break;
		}
	},
	previewHtml: function(dthtml){
		var header = "DAFTAR DETAIL SETORAN KB ANGSURAN";		
		var html = "<div align='center' class='judul_laporan' style='{width:100%;font-size:14;font-weight:bold;}'><br><br>"+this.app._namalokasi.toUpperCase()+"<br>"+header+"<br>";
		var d = new Date();
		html += "<br><span style='{font-size:9;}'>Dicetak "+ d.toLocaleString()+"</span>";
		html += "</div>";
		html += "<center>"+dthtml+"</center>";
		this.viewer.preview(html);
		this.allHtml = html;
	}	
});
