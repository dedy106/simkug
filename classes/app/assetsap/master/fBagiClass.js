/**
 * @author dweexfuad
 */
window.app_assetsap_master_fBagiClass = function(owner)
{
	if (owner)
	{
		window.app_assetsap_master_fBagiClass.prototype.parent.constructor.call(this,owner);
		this.className  = "app_assetsap_master_fBagiClass";
		this.maximize();
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Pembagian Lokasi VEAT", 0);	

		uses("saiCBBL;label;util_standar;datePicker;saiGrid;sgNavigator");	
		uses("saiGrid;rowGrid",true);
		this.ed_periode = new saiLabelEdit(this,{bound:[20,9,180,20],caption:"Periode",readOnly:true,text:this.app._periode});
		this.ed_kode = new saiLabelEdit(this, {bound:[20,10,180,20], caption:"No Bukti"});
		this.bGen = new button(this,{bound:[220,10,80,20], caption:"Generate", click:"doClick"});
		this.ed_nik = new saiCBBL(this,{bound:[20,11,185,20],caption:"Pembuat", multiSelection:false, 			
			sql:["select nik, nama from amu_karyawan where kode_lokasi = '"+this.app._lokasi+"' ",["nik","nama"],false, ["nik","nama"],"and","Daftar Karyawan",false]
		});													
		this.ed_ket = new saiLabelEdit(this,{bound:[20,12,400,20],caption:"Keterangan",maxLength:100, tag:1});				
		this.lbl = new label(this,{bound:[20,13,100,20],caption:"Tanggal",underline:true});	
		this.dpTgl = new datePicker(this,{bound:[120,13,100,18]});
		this.p1 = new panel(this,{bound:[20,14,900,300],caption:"Data Kelompok Aset(Asset Class)"});
		this.sg = new saiGrid(this.p1,{bound:[1,20,898,250], colCount:4, colTitle:"Kode Klp, Nama Kelompok, Inv. Fisik, Proc. Alt",
			colWidth:[[3,2,1,0],[100,100,250,80]], colFormat:[[2,3],[cfBoolean, cfBoolean]],
			colAlign:[[3,2],[alCenter, alCenter]], buttonStyle:[[2,3],[bsRadio, bsRadio]],
			change:[this,"doGridChange"]
		});
		this.sgn = new sgNavigator(this.p1, {bound:[1, 270,898, 25], grid:this.sg, buttonStyle:bsView, pager:[this,"doPager"]});
		setTipeButton(tbSimpan);			
		this.rearrangeChild(10,23);
		this.setTabChildIndex();
		try
		{		
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);			
			this.standarLib = new util_standar();
			var sql = new server_util_arrayList();
			sql.add("select a.kode_klpfa, a.nama, 'false' as fisik, "+
				"	'false' as alternatif  "+
				" from amu_klp a  where a.kode_lokasi = '"+this.app._lokasi+"' and a.tipe ='CLASS' order by a.kode_klpfa ");
			sql.add("select kode_lokfa, nama from amu_lokasi where kode_lokasi = '"+this.app._lokasi+"' and tipe = 'UBIS'");			
			sql.add("select kode_klpfa, jenis_proc, kode_lokfa from amu_bagiklp_d where periode = '"+this.app._periode+"' ");
			this.dbLib.getMultiDataProviderA(sql);
			this.sysCode = 0;
		}catch(e)
		{
			systemAPI.alert(e);
		}
	}
};
window.app_assetsap_master_fBagiClass.extend(window.childForm);
window.app_assetsap_master_fBagiClass.implement({
	mainButtonClick: function(sender){
		if (sender == this.app._mainForm.bClear){
			if (this.sysCode == 0)
				system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");	
			else system.confirm(this, "clear", "Transaksi sukses disimpan("+this.ed_kode.getText()+")","<br>Screen akan dibersihkan?");	
		}if (sender == this.app._mainForm.bSimpan)
			system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");	
		if (sender == this.app._mainForm.bEdit)
			system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");	
		if (sender == this.app._mainForm.bHapus)
			system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");	
	},
	doModalResult: function(event, modalResult){			
		switch (event)
		{
			case "clear" :
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, [0,1],this.ed_kode);				
				this.sysCode = 0;
				this.ed_periode.setText(this.app._periode);
				if (this.dataMasterFA) this.initColumn(this.dataMasterFA);
				break;
			case "simpan" :
				if (modalResult == mrOk)
				{
					try
					{					
						uses("server_util_arrayList");
						sql = new server_util_arrayList();
						sql.add("delete from amu_bagiklp_m where periode = '"+this.ed_periode.getText()+"' ");
						sql.add("delete from amu_bagiklp_d where periode = '"+this.ed_periode.getText()+"' ");
						sql.add("insert into amu_bagiklp_m (no_bukti, nik_buat, periode, tanggal, keterangan) values "+
								"('"+this.ed_kode.getText()+"','"+this.ed_nik.getText()+"', '"+this.ed_periode.getText()+"', '"+this.dpTgl.getDateString()+"', '"+this.ed_ket.getText()+"')");
						var ada, data;
						for (var i in this.dataKlp.objList){
							data = this.dataKlp.get(i);
							if (data[2] == "true"){
								ada = false;
								/*for (var c in this.lokfa.objList){
									if (data[parseFloat(c) + 4] == "true"){
										ada = true;
										sql.add("insert into amu_bagiklp_d(no_bukti, kode_klpfa, jenis_proc, kode_lokfa, periode)values('"+this.ed_kode.getText()+"', '"+data[0]+"', 'FISIK','"+this.lokfa.get(c).kode_lokfa+"','"+this.ed_periode.getText()+"')");	
									}
								}*/
								if (!ada){
									sql.add("insert into amu_bagiklp_d(no_bukti, kode_klpfa, jenis_proc, kode_lokfa, periode)values('"+this.ed_kode.getText()+"', '"+data[0]+"', 'FISIK','-','"+this.ed_periode.getText()+"')");	
								}
							}else if (data[3] == "true"){
								ada = false;
								for (var c in this.lokfa.objList){
									if (data[parseFloat(c) + 4] == "true"){
										ada = true;
										sql.add("insert into amu_bagiklp_d(no_bukti, kode_klpfa, jenis_proc, kode_lokfa, periode)values('"+this.ed_kode.getText()+"', '"+data[0]+"', 'ALTERNATIF','"+this.lokfa.get(c).kode_lokfa+"','"+this.ed_periode.getText()+"')");	
									}
								}
								if (!ada){
									sql.add("insert into amu_bagiklp_d(no_bukti, kode_klpfa, jenis_proc, kode_lokfa, periode)values('"+this.ed_kode.getText()+"', '"+data[0]+"', 'ALTERNATIF','-','"+this.ed_periode.getText()+"')");	
								}
							}
						}
						this.dbLib.execArraySQL(sql);	
					}
					catch(e)
					{
						system.alert(this, e,"");
					}
				}
				break;
			case "ubah" :
				if (modalResult == mrOk)
				{
						uses("server_util_arrayList");					
						var sql = new server_util_arrayList();
						sql.add("delete from amu_bagiklp_m where no_bukti = '"+this.ed_kode.getText()+"' ");
						sql.add("delete from amu_bagiklp_d where no_bukti = '"+this.ed_kode.getText()+"' ");						
						sql.add("insert into amu_bagiklp_m (no_bukti, nik_buat, periode, tanggal, keterangan) values "+
								"('"+this.ed_kode.getText()+"','"+this.ed_nik.getText()+"', '"+this.ed_periode.getText()+"', '"+this.dpTgl.getDateString()+"', '"+this.ed_ket.getText()+"')");
						var ada, data;
						for (var i in this.dataKlp.objList){
							data = this.dataKlp.get(i);
							if (data[2] == "true"){
								ada = false;
								for (var c in this.lokfa.objList){
									if (data[parseFloat(c) + 4] == "true"){
										ada = true;
										sql.add("insert into amu_bagiklp_d(no_bukti, kode_klpfa, jenis_proc, kode_lokfa, periode)values('"+this.ed_kode.getText()+"', '"+data[0]+"', 'FISIK','"+this.lokfa.get(c).kode_lokfa+"','"+this.ed_periode.getText()+"')");	
									}
								}
								if (!ada){
									sql.add("insert into amu_bagiklp_d(no_bukti, kode_klpfa, jenis_proc, kode_lokfa, periode)values('"+this.ed_kode.getText()+"', '"+data[0]+"', 'FISIK','-','"+this.ed_periode.getText()+"')");	
								}
							}else if (data[3] == "true"){
								ada = false;
								for (var c in this.lokfa.objList){
									if (data[parseFloat(c) + 4] == "true"){
										ada = true;
										sql.add("insert into amu_bagiklp_d(no_bukti, kode_klpfa, jenis_proc, kode_lokfa, periode)values('"+this.ed_kode.getText()+"', '"+data[0]+"', 'ALTERNATIF','"+this.lokfa.get(c).kode_lokfa+"','"+this.ed_periode.getText()+"')");	
									}
								}
								if (!ada){
									sql.add("insert into amu_bagiklp_d(no_bukti, kode_klpfa, jenis_proc, kode_lokfa, periode)values('"+this.ed_kode.getText()+"', '"+data[0]+"', 'ALTERNATIF','-','"+this.ed_periode.getText()+"')");	
								}
							}
						}
						this.dbLib.execArraySQL(sql);	
				}
				break;
			case "hapus" :
			   if (modalResult == mrOk)
			   {
					uses("server_util_arrayList");					
						var sql = new server_util_arrayList();
						sql.add("delete from amu_bagiklp_m where no_bukti = '"+this.ed_kode.getText()+"' ");
						sql.add("delete from amu_bagiklp_d where no_bukti = '"+this.ed_kode.getText()+"' ");						
						this.dbLib.execArraySQL(sql);	
			   }
				break;
		}
	},
	doEditChange: function(sender){		
		if (this.ed_kode.getText() != "")
		{
			try
			{
				this.standarLib.clearByTag(this, new Array("1"),undefined);	
				var data = this.dbLib.getDataProvider("select ifnull(a.periode,'-') as periode, date_format(a.tanggal,'%d-%m-%Y') as tgl, a.keterangan, a.nik, b.nama,  "+
											" d.kode_klpfa, d.nama as nmklp, case when i.fisik == '1' then 'FISIK' "+
											 "				case when i.alternatif == '1' then 'ALTERNATIF' else '-' end c.jenis_proc "+
											 " from amu_klp d "+
											 "	inner join inventupl i on i.klp = d.kode_klpfa "+
											 " left outer join amu_bagiklp_d c on c.kode_klpfa = d.kode_klpfa and c.no_bukti = '"+sender.getText()+"' "+
											 " left outer join amu_bagiklp_m a on a.no_bukti = c.no_bukti "+
											 " inner join amu_karyawan b on b.nik = a.nik_buat "+											 
											 " ", true);
				if (typeof data != "string")
				{
					if (data.rs.rows[0] != undefined)
					{									
						var line, first = true;	
						this.sg.clear();
						for (var i in data.rs.rows){
							line = data.rs.rows[i];
							if (line.periode != "-" && first){
								this.ed_nik.setText(line.nik, line.nama);
								this.ed_periode.setText(line.periode);
								this.ed_ket.setText(line.keterangan);
								this.dpTgl.setText(line.tgl);		
								first = false;
							}
							this.sg.appendData([line.kode_klpfa, line.nmklp, (line.jenis_proc == "FISIK" ? "true":"false"), (line.jenis_proc == "ALTERNATIF" ? "true":"false")]);
						}
						setTipeButton(tbUbahHapus);
					} else
					{
						setTipeButton(tbSimpan);
					}
				}else 
				{	
					setTipeButton(tbSimpan);
				}
			}catch(e)
			{
				system.alert(this, e,"");
			}
		}
	},
	doRequestReady: function(sender, methodName, result){
		try{
			if (sender == this.dbLib)
			{
				switch	(methodName)
				{
					case "execArraySQL" :
						if (result.toLowerCase().search("error") == -1)					
						{				
							this.sysCode = 1;		  
							this.app._mainForm.bClear.click();              
						}else
							system.alert(this, result,"");
						break;
						
					case "getMultiDataProvider" :																						
						result = JSON.parse(result);
						var row, klpfa, lokfa;					
						klpfa = result.result[0];
						lokfa = result.result[1];						
						this.initColumn(result);
						this.dataMasterFA = result;						
					break;
				}
			}
		}catch(e){
			system.alert(this,e,result);
		}
	},
	doGridChange: function(sender, col, row){
		this.sg.onChange.set(this, undefined);
		try{
			/*var data = this.dataKlp.get(this.klpfa[(this.page - 1) * this.rowPerPage + row].kode_klpfa);
			data[col] = sender.cells(col, row);			
			if (col == 2){							
				if (sender.cells(2,row) == "true" && sender.cells(3,row) == "true") {
					sender.cells(3,row, "false");					
					data[3] = "false";
				}else if (sender.cells(2,row) == "false" && sender.cells(3,row) == "false"){
					sender.cells(2,row, "true");
					sender.cells(3,row, "false");
					data[3] = "false";
					data[2] = "true";
				}
			}else if (col == 3){
				if (sender.cells(2,row) == "true" && sender.cells(3,row) == "true") {
					sender.cells(2,row, "false");
					data[2] = "false";
				}else if (sender.cells(2,row) == "false" && sender.cells(3,row) == "false"){
					sender.cells(3,row, "true");
					sender.cells(2,row, "false");
					data[2] = "false";
					data[3] = "true";
				}
			}*/
			this.sg.onChange.set(this, "doGridChange");
		}catch(e){
			this.sg.onChange.set(this, "doGridChange");
			systemAPI.alert(e);
		}	
	},
	doClick: function(sender){
		this.ed_kode.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'amu_bagiklp_m','no_bukti',"KLP/"+this.dpTgl.getYear()+"/",'0000'));
	}, 
	initColumn : function(result){
		try{					
			var klpfa = result.result[0];
			var lokfa = result.result[1];		
			var bagiClass = result.result[2];
			var line,bgClass = new arrayMap();
			var bagiKlp = new arrayMap();
			for (var i in bagiClass.rs.rows){
				line = bagiClass.rs.rows[i];
				bgClass.set(line.kode_klpfa+line.kode_lokfa, line);
				bagiKlp.set(line.kode_klpfa, line.jenis_proc);
			}	
			
			this.sg.clear();
			this.sg.setColCount(lokfa.rs.rows.length + 4);
			this.sg.setColFormat([1,2,3],[cfHurufBesar,cfBoolean, cfBoolean]);
			this.sg.setColAlign([3,2],[alCenter, alCenter]);
			//this.sg.setButtonStyle([2,3],[bsRadio, bsRadio]);						
			var line, title = ["Kode Klp","Nama Kelompok","Inv. Fisik","Proc. Alt"];
			this.lokfa = new arrayMap();
			this.sg.setColWidth([3,2,1,0],[100,100,150,80]);
			for (var i in lokfa.rs.rows){
				line = lokfa.rs.rows[i];
				this.lokfa.set(i, line);
				title[title.length] = line.nama;
				this.sg.columns.get(parseFloat(i)+4).setColWidth((line.nama.length * 7 < 80 ? 80:line.nama.length * 7));
				this.sg.columns.get(parseFloat(i)+4).setColumnFormat(cfBoolean);			
			}
			this.sg.setColTitle(title);
			this.dataKlp = new portalui_arrayMap();			
			var data, ada;
			for (var i in klpfa.rs.rows){
				row = klpfa.rs.rows[i];				
				var fisik = bagiKlp.get(row.kode_klpfa) == "FISIK" ? "true":"false";
				var alternatif = bagiKlp.get(row.kode_klpfa) == "ALTERNATIF" ? "true":"false";
				data =[row.kode_klpfa, row.nama, fisik, alternatif];				
				
				for (var c in this.lokfa.objList) {
					ada = bgClass.get(row.kode_klpfa+this.lokfa.get(c).kode_lokfa);					
					data[data.length] =  ada  ? "true":"false";					
				}
				this.dataKlp.set(row.kode_klpfa, data);				
			}
			this.klpfa = klpfa.rs.rows;
			this.rowPerPage = 10;
			this.sgn.setTotalPage(Math.ceil(this.klpfa.length / 10));
			this.sgn.rearrange();
			this.doPager(this.sgn, 1);
		}catch(e){
			alert(e);
		}
	},
	doPager : function(sender, page){
		var start = (page - 1) * this.rowPerPage;
		var finish = (start + this.rowPerPage > this.dataKlp.getLength() ? this.dataKlp.getLength() : start + this.rowPerPage);
		this.sg.clear();
		var data;
		for (var i=start;i < finish; i++){
			data = this.dataKlp.get(this.klpfa[i].kode_klpfa);
			this.sg.appendData(data);			
		}
		this.sg.setNoUrut(start);
		this.page = page;
	}
});
